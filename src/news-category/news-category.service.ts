import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export interface CreateNewsCategoryDto {
  zh_name: string;
  en_name: string;
}

export interface UpdateNewsCategoryDto {
  zh_name?: string;
  en_name?: string;
}

@Injectable()
export class NewsCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  // 根據語系轉換數據
  private transformByLanguage(data: any, language: string) {
    const isZh = language === 'zh' || language === 'zh-TW' || language === 'zh-CN';

    return {
      id: data.id,
      name: isZh ? data.zh_name : data.en_name,
    };
  }

  // 創建新聞分類
  async create(data: CreateNewsCategoryDto) {
    // 驗證必填字段
    if (!data.zh_name) {
      throw new BadRequestException('中文名稱不能為空');
    }
    if (!data.en_name) {
      throw new BadRequestException('英文名稱不能為空');
    }

    return await this.prisma.newsCategory.create({
      data: {
        zh_name: data.zh_name,
        en_name: data.en_name,
      },
    });
  }

  // 內部方法：獲取原始數據（用於 update 和 remove）
  private async _findOneRaw(id: string) {
    const category = await this.prisma.newsCategory.findUnique({
      where: { id },
    });

    if (!category || category.deletedAt) {
      throw new NotFoundException('新聞分類不存在');
    }

    return category;
  }

  // 獲取所有新聞分類（排除已軟刪除的）
  async findAll(language: string = 'en') {
    const categories = await this.prisma.newsCategory.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return categories.map((category) =>
      this.transformByLanguage(category, language),
    );
  }

  // 根據 ID 獲取單個新聞分類
  async findOne(id: string, language: string = 'en') {
    const category = await this._findOneRaw(id);
    return this.transformByLanguage(category, language);
  }

  // 管理員獲取所有新聞分類（不進行語系轉換，返回完整數據）
  async findAllByAdmin() {
    return await this.prisma.newsCategory.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // 管理員根據 ID 獲取單個新聞分類（不進行語系轉換，返回完整數據）
  async findOneByAdmin(id: string) {
    return await this._findOneRaw(id);
  }

  // 更新新聞分類
  async update(id: string, data: UpdateNewsCategoryDto) {
    // 先檢查新聞分類是否存在
    await this._findOneRaw(id);

    return await this.prisma.newsCategory.update({
      where: { id },
      data: {
        ...(data.zh_name !== undefined && { zh_name: data.zh_name }),
        ...(data.en_name !== undefined && { en_name: data.en_name }),
      },
    });
  }

  // 軟刪除新聞分類
  async remove(id: string) {
    // 先檢查新聞分類是否存在
    await this._findOneRaw(id);

    // 檢查是否有關聯的新聞
    const newsCount = await this.prisma.news.count({
      where: { categoryId: id },
    });

    if (newsCount > 0) {
      throw new BadRequestException(
        `無法刪除：此分類下還有 ${newsCount} 篇新聞`,
      );
    }

    // 軟刪除
    await this.prisma.newsCategory.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: '新聞分類已成功刪除' };
  }

  // 永久刪除新聞分類（可選，謹慎使用）
  async forceRemove(id: string) {
    const category = await this.prisma.newsCategory.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('新聞分類不存在');
    }

    await this.prisma.newsCategory.delete({
      where: { id },
    });

    return { message: '新聞分類已永久刪除' };
  }
}
