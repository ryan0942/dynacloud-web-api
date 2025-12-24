import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  private formatDates(data: any): any {
    if (data === null || data === undefined) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.formatDates(item));
    }

    if (typeof data === 'object' && !(data instanceof Date)) {
      const formatted = { ...data };

      for (const key in formatted) {
        if (formatted.hasOwnProperty(key)) {
          const value = formatted[key];

          if (
            (key === 'createdAt' || key === 'updatedAt') &&
            value !== null &&
            value !== undefined
          ) {
            if (
              value instanceof Date ||
              (typeof value === 'string' && dayjs(value).isValid())
            ) {
              formatted[key] = dayjs(value).format('YYYY-MM-DD HH:mm');
            }
          } else if (typeof value === 'object' && value !== null) {
            formatted[key] = this.formatDates(value);
          }
        }
      }

      return formatted;
    }

    return data;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const message =
      this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) ||
      '操作成功';

    return next.handle().pipe(
      map((data) => ({
        success: true,
        result: this.formatDates(data),
        message,
      })),
    );
  }
}
