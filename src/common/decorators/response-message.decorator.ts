// src/common/decorators/response-message.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const RESPONSE_MESSAGE_KEY = 'response_message';

/**
 * 自訂裝飾器：設定回應訊息
 * @param message 你希望回傳的訊息內容
 */
export const ResponseMessage = (message: string) =>
  SetMetadata(RESPONSE_MESSAGE_KEY, message);
