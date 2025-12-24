import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export interface CreateBlogCategoryDto {
  zh_name: string;
  en_name: string;
}

export interface UpdateBlogCategoryDto {
  zh_name?: string;
  en_name?: string;
}

@Injectable()
export class BlogCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  // 根據語系轉換數據
  private transformByLanguage(data: any, language: string) {
    const isZh = language === 'zh' || language === 'zh-TW' || language === 'zh-CN';

    return {
      id: data.id,
      name: isZh ? data.zh_name : data.en_name,
    };
  }

  // 創建部落格分類
  async create(data: CreateBlogCategoryDto) {
    // 驗證必填字段
    if (!data.zh_name || !data.en_name) {
      throw new BadRequestException('缺少必填字段');
    }

    return await this.prisma.blogCategory.create({
      data: {
        zh_name: data.zh_name,
        en_name: data.en_name,
      },
    });
  }

  // 內部方法：獲取原始數據（用於 update 和 remove）
  private async _findOneRaw(id: string) {
    const category = await this.prisma.blogCategory.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('部落格分類不存在');
    }

    return category;
  }

  // 獲取所有部落格分類
  async findAll(language: string = 'en') {
    const categories = await this.prisma.blogCategory.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return categories.map((category) =>
      this.transformByLanguage(category, language),
    );
  }

  // 根據 ID 獲取單個部落格分類
  async findOne(id: string, language: string = 'en') {
    const category = await this._findOneRaw(id);
    return this.transformByLanguage(category, language);
  }

  // 管理員獲取所有部落格分類（不進行語系轉換，返回完整數據）
  async findAllByAdmin() {
    return await this.prisma.blogCategory.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // 管理員根據 ID 獲取單個部落格分類（不進行語系轉換，返回完整數據）
  async findOneByAdmin(id: string) {
    return await this._findOneRaw(id);
  }

  // 更新部落格分類
  async update(id: string, data: UpdateBlogCategoryDto) {
    // 先檢查部落格分類是否存在
    await this._findOneRaw(id);

    return await this.prisma.blogCategory.update({
      where: { id },
      data: {
        ...(data.zh_name !== undefined && { zh_name: data.zh_name }),
        ...(data.en_name !== undefined && { en_name: data.en_name }),
      },
    });
  }

  // 刪除部落格分類
  async remove(id: string) {
    // 先檢查部落格分類是否存在
    await this._findOneRaw(id);

    // 檢查是否有關聯的部落格
    const blogCount = await this.prisma.blog.count({
      where: { categoryId: id },
    });

    if (blogCount > 0) {
      throw new BadRequestException(
        `無法刪除：此分類下還有 ${blogCount} 篇部落格`,
      );
    }

    await this.prisma.blogCategory.delete({
      where: { id },
    });

    return { message: '部落格分類已成功刪除' };
  }
}
