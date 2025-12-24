import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export interface UpdateCompanyInfoDto {
  zh_address?: string;
  en_address?: string;
  zh_phone?: string;
  en_phone?: string;
  zh_email?: string;
  en_email?: string;
  zh_opening_time?: string;
  en_opening_time?: string;
}

@Injectable()
export class CompanyInfoService {
  constructor(private readonly prisma: PrismaService) {}

  // 根據語系轉換數據
  private transformByLanguage(data: any, language: string) {
    const isZh = language === 'zh' || language === 'zh-TW' || language === 'zh-CN';

    return {
      id: data.id,
      address: isZh ? data.zh_address : data.en_address,
      phone: isZh ? data.zh_phone : data.en_phone,
      email: isZh ? data.zh_email : data.en_email,
      opening_time: isZh ? data.zh_opening_time : data.en_opening_time,
    };
  }

  // 獲取公司資訊（返回第一筆）
  async findFirst(language: string = 'en') {
    const companyInfo = await this.prisma.companyInfo.findFirst({
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!companyInfo) {
      throw new NotFoundException('公司資訊不存在');
    }

    return this.transformByLanguage(companyInfo, language);
  }

  // 管理員獲取公司資訊（返回完整數據）
  async findFirstByAdmin() {
    const companyInfo = await this.prisma.companyInfo.findFirst({
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!companyInfo) {
      throw new NotFoundException('公司資訊不存在');
    }

    return companyInfo;
  }

  // 更新公司資訊（更新第一筆）
  async update(data: UpdateCompanyInfoDto) {
    // 先獲取第一筆資料
    const companyInfo = await this.prisma.companyInfo.findFirst({
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!companyInfo) {
      throw new NotFoundException('公司資訊不存在');
    }

    return await this.prisma.companyInfo.update({
      where: { id: companyInfo.id },
      data: {
        ...(data.zh_address !== undefined && { zh_address: data.zh_address }),
        ...(data.en_address !== undefined && { en_address: data.en_address }),
        ...(data.zh_phone !== undefined && { zh_phone: data.zh_phone }),
        ...(data.en_phone !== undefined && { en_phone: data.en_phone }),
        ...(data.zh_email !== undefined && { zh_email: data.zh_email }),
        ...(data.en_email !== undefined && { en_email: data.en_email }),
        ...(data.zh_opening_time !== undefined && {
          zh_opening_time: data.zh_opening_time,
        }),
        ...(data.en_opening_time !== undefined && {
          en_opening_time: data.en_opening_time,
        }),
      },
    });
  }
}
