import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export interface UpdateAboutDto {
  zh_content?: string;
  en_content?: string;
}

@Injectable()
export class AboutService {
  constructor(private readonly prisma: PrismaService) {}

  // 根據語系轉換數據
  private transformByLanguage(data: any, language: string) {
    const isZh = language === 'zh' || language === 'zh-TW' || language === 'zh-CN';

    return {
      id: data.id,
      content: isZh ? data.zh_content : data.en_content,
    };
  }

  // 獲取關於我們（返回第一筆）
  async findFirst(language: string = 'en') {
    const about = await this.prisma.about.findFirst({
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!about) {
      throw new NotFoundException('關於我們資訊不存在');
    }

    return this.transformByLanguage(about, language);
  }

  // 管理員獲取關於我們（返回完整數據）
  async findFirstByAdmin() {
    const about = await this.prisma.about.findFirst({
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!about) {
      throw new NotFoundException('關於我們資訊不存在');
    }

    return about;
  }

  // 更新關於我們（更新第一筆）
  async update(data: UpdateAboutDto) {
    // 先獲取第一筆資料
    const about = await this.prisma.about.findFirst({
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!about) {
      throw new NotFoundException('關於我們資訊不存在');
    }

    return await this.prisma.about.update({
      where: { id: about.id },
      data: {
        ...(data.zh_content !== undefined && { zh_content: data.zh_content }),
        ...(data.en_content !== undefined && { en_content: data.en_content }),
      },
    });
  }
}
