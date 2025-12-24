import { Storage } from '@google-cloud/storage';
import { Injectable, Logger } from '@nestjs/common';
import * as path from 'node:path';

@Injectable()
export class GcsStorageService {
  private storage: Storage;
  private bucketName: string;
  private readonly logger = new Logger(GcsStorageService.name);

  constructor() {
    // 編譯後的路徑是 dist/gcs/，需要往上兩層到達根目錄
    const keyPath = path.join(__dirname, '../../gcs-key.json');

    this.storage = new Storage({
      keyFilename: keyPath,
      projectId: process.env.GCP_PROJECT_ID,
    });

    this.bucketName = process.env.GCS_BUCKET!;
  }

  async uploadFile(params: {
    fileName: string;
    buffer: Buffer;
    contentType?: string;
  }): Promise<string> {
    const { fileName, buffer, contentType } = params;

    const bucket = this.storage.bucket(this.bucketName);
    const file = bucket.file(fileName);

    await file.save(buffer, {
      resumable: false,
      contentType,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });

    return `https://storage.googleapis.com/${this.bucketName}/${fileName}`;
  }

  async getSignedUrl(fileName: string, expiresInSeconds = 60 * 10): Promise<string> {
    const [url] = await this.storage
      .bucket(this.bucketName)
      .file(fileName)
      .getSignedUrl({
        action: 'read',
        expires: Date.now() + expiresInSeconds * 1000,
      });

    return url;
  }

  async deleteFile(fileName: string): Promise<void> {
    await this.storage.bucket(this.bucketName).file(fileName).delete({
      ignoreNotFound: true,
    });
  }
}
