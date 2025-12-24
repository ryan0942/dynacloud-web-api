// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // 判斷是否為 HttpException
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 取得錯誤訊息，若不是 HttpException 則設定預設訊息
    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as any).message || exception.message
        : 'Internal server error';

    response.status(status).json({
      success: false,
      result: null,
      message,
    });
  }
}
