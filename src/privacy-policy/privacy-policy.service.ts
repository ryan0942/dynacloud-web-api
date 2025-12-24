import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export interface UpdatePrivacyPolicyDto {
  zh_content?: string;
  en_content?: string;
}

@Injectable()
export class PrivacyPolicyService {
  constructor(private readonly prisma: PrismaService) {}

  // 根據語系轉換數據
  private transformByLanguage(data: any, language: string) {
    const isZh =
      language === 'zh' || language === 'zh-TW' || language === 'zh-CN';

    return {
      id: data.id,
      content: isZh ? data.zh_content : data.en_content,
    };
  }

  // 獲取隱私權政策（返回第一筆）
  async findFirst(language: string = 'en') {
    const privacyPolicy = await this.prisma.privacyPolicy.findFirst({
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!privacyPolicy) {
      throw new NotFoundException('隱私權政策資訊不存在');
    }

    return this.transformByLanguage(privacyPolicy, language);
  }

  // 管理員獲取隱私權政策（返回完整數據）
  async findFirstByAdmin() {
    const privacyPolicy = await this.prisma.privacyPolicy.findFirst({
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!privacyPolicy) {
      throw new NotFoundException('隱私權政策資訊不存在');
    }

    return privacyPolicy;
  }

  // 更新隱私權政策（更新第一筆）
  async update(data: UpdatePrivacyPolicyDto) {
    // 先獲取第一筆資料
    const privacyPolicy = await this.prisma.privacyPolicy.findFirst({
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!privacyPolicy) {
      throw new NotFoundException('隱私權政策資訊不存在');
    }

    return await this.prisma.privacyPolicy.update({
      where: { id: privacyPolicy.id },
      data: {
        ...(data.zh_content !== undefined && { zh_content: data.zh_content }),
        ...(data.en_content !== undefined && { en_content: data.en_content }),
      },
    });
  }
}
