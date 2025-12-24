import { Injectable } from '@nestjs/common';
import {
  MulterOptionsFactory,
  MulterModuleOptions,
} from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Injectable()
export class FileUploadService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: memoryStorage(), // 使用記憶體存儲，稍後直接上傳到 GCS
      limits: {
        fileSize: 10 * 1024 * 1024, // 限制 10MB
      },
    };
  }
}
