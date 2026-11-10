import { Status } from '@prisma/client';

/** 和各 service 的 findAll 相同的中文判斷（zh / zh-TW / zh-CN） */
export function isZhLanguage(language?: string): boolean {
  return language === 'zh' || language === 'zh-TW' || language === 'zh-CN';
}

/**
 * 公開端點能不能回傳這筆資料：條件和公開列表（findAll）一致。
 * - 有 status 欄位的（Blog、News、Case、Service）必須是 Active
 * - 必須在該語系顯示（showInZh / showInEn）
 */
export function isPubliclyVisible(
  item: { status?: Status; showInZh: boolean; showInEn: boolean },
  language?: string,
): boolean {
  if (item.status !== undefined && item.status !== Status.Active) {
    return false;
  }
  return isZhLanguage(language) ? item.showInZh : item.showInEn;
}
