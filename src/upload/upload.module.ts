import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { GcsModule } from '../../gcs/gcs.module';
import { MulterModule } from '@nestjs/platform-express';
import { PassportModule } from '@nestjs/passport';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(), // 使用記憶體儲存以獲取 buffer
    }),
    GcsModule,
    PassportModule,
  ],
  controllers: [UploadController],
})
export class UploadModule {}
