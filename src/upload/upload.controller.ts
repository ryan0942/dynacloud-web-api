import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'node:crypto';
import * as path from 'node:path';
import { GcsStorageService } from '../../gcs/gcs-storage.service';
import { UploadResponseDto } from './dto/upload-response.dto';

@ApiTags('檔案上傳')
@Controller('files')
export class UploadController {
  constructor(private readonly gcs: GcsStorageService) {}

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'UP-01 上傳檔案至 GCS',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '檔案上傳成功',
    type: UploadResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @UseInterceptors(FileInterceptor('file')) // 前端 form-data 欄位名稱: file
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const ext = path.extname(file.originalname) || '';
    const key = `uploads/${randomUUID()}${ext}`;

    const url = await this.gcs.uploadFile({
      fileName: key,
      buffer: file.buffer,
      contentType: file.mimetype,
    });

    return {
      url,
    };
  }
}
