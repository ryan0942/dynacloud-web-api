import { ExecutionContext } from '@nestjs/common';
import { isIP } from 'net';

/*
 * 限流（ThrottlerGuard）的來源判斷
 *
 * 前台、後台都是在伺服器端呼叫 API（server action / SSR），所以 API 看到的來源
 * 幾乎都是自己的伺服器：所有訪客共用同一組額度，公開列表會被 429（2026-10-22 實際發生）。
 *
 * 做法：
 * - main.ts 設定 trust proxy，req.ip 取得真實來源 IP（LB 會附上 X-Forwarded-For）
 * - 來自自己伺服器的 GET 不限流；寫入（POST/PUT/DELETE）與外部直接呼叫照常限流
 *
 * 「自己的伺服器」= 私有 / loopback 位址（docker 內網、staging 走 localhost）
 *                 + 環境變數 THROTTLE_TRUSTED_IPS（逗號分隔；production 填 VM 的外部 IP，
 *                   因為前台、後台目前用公開網域呼叫 API，會經過 LB 繞回來）
 */

/** 去掉 IPv4-mapped IPv6 的前綴（::ffff:10.0.0.1 → 10.0.0.1） */
function normalizeIp(ip: string): string {
  return ip.startsWith('::ffff:') && isIP(ip.slice(7)) === 4 ? ip.slice(7) : ip;
}

export function isPrivateOrLoopbackIp(rawIp: string): boolean {
  const ip = normalizeIp(rawIp);
  if (isIP(ip) === 4) {
    const [a, b] = ip.split('.').map(Number);
    return (
      a === 10 ||
      a === 127 ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168)
    );
  }
  if (isIP(ip) === 6) {
    const lower = ip.toLowerCase();
    return lower === '::1' || lower.startsWith('fc') || lower.startsWith('fd');
  }
  return false;
}

function trustedIps(): Set<string> {
  return new Set(
    (process.env.THROTTLE_TRUSTED_IPS ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  );
}

export function isTrustedSource(rawIp: string | undefined): boolean {
  if (!rawIp) return false;
  const ip = normalizeIp(rawIp);
  return isPrivateOrLoopbackIp(ip) || trustedIps().has(ip);
}

/** ThrottlerModule 的 skipIf：自己伺服器發出的 GET 不限流 */
export function skipThrottleForTrustedReads(context: ExecutionContext): boolean {
  if (context.getType() !== 'http') return false;
  const req = context.switchToHttp().getRequest<{ method: string; ip?: string }>();
  return req.method === 'GET' && isTrustedSource(req.ip);
}

/**
 * Express 的 trust proxy 層數：信任「socket 位址 + X-Forwarded-For 從右邊數」共 n 個位址，取下一個當 req.ip。
 * production：client → GCP LB（附加 X-Forwarded-For: <client>, <LB IP>）→ nginx（原樣轉送）→ docker-proxy → api
 * X-Forwarded-For 的最後一筆是 LB IP，倒數第二筆才是 client，所以預設信任 2 層。
 */
export function trustProxyHops(): number {
  const n = Number(process.env.TRUST_PROXY_HOPS ?? 2);
  return Number.isInteger(n) && n >= 0 ? n : 2;
}
