import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from '../prisma.service';

export interface CreateNewsDto {
  showInZh?: boolean;
  showInEn?: boolean;
  zh_title?: string;
  en_title?: string;
  cover: string;
  zh_description?: string;
  en_description?: string;
  categoryId: string;
  zh_content?: string;
  en_content?: string;
  zh_tags?: string;
  en_tags?: string;
  startDateTime: string;
  endDateTime: string;
  status?: Status;
}

export interface UpdateNewsDto {
  showInZh?: boolean;
  showInEn?: boolean;
  zh_title?: string;
  en_title?: string;
  cover?: string;
  zh_description?: string;
  en_description?: string;
  categoryId?: string;
  zh_content?: string;
  en_content?: string;
  zh_tags?: string;
  en_tags?: string;
  startDateTime?: string;
  endDateTime?: string;
  status?: Status;
}

export interface FindAllNewsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  query?: string;
  language?: string;
}

export interface FindAllByAdminParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  query?: string;
  status?: Status;
  language?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  has_next: boolean;
  total: number;
}

export interface PaginatedNewsResult {
  data: any[];
  pagination: PaginationInfo;
}

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  // 根據語系轉換分類數據
  private transformCategoryByLanguage(category: any, language: string) {
    if (!category) return null;
    const isZh = language === 'zh' || language === 'zh-TW' || language === 'zh-CN';

    return {
      id: category.id,
      name: isZh ? category.zh_name : category.en_name,
    };
  }

  // 根據語系轉換新聞數據
  private transformByLanguage(data: any, language: string, includeContent: boolean = true) {
    const isZh = language === 'zh' || language === 'zh-TW' || language === 'zh-CN';

    const result: any = {
      id: data.id,
      title: isZh ? data.zh_title : data.en_title,
      cover: data.cover,
      description: isZh ? data.zh_description : data.en_description,
      category: this.transformCategoryByLanguage(data.category, language),
      tags: isZh ? data.zh_tags : data.en_tags,
      startDateTime: data.startDateTime,
      endDateTime: data.endDateTime,
      status: data.status,
      updatedAt: data.updatedAt,
    };

    // 只在需要時包含 content（避免列表頁流量過大）
    if (includeContent) {
      result.content = isZh ? data.zh_content : data.en_content;
    }

    return result;
  }

  // 內部方法：獲取原始數據（用於 update 和 remove）
  private async _findOneRaw(id: string) {
    const news = await this.prisma.news.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!news) {
      throw new NotFoundException('新聞不存在');
    }

    return news;
  }

  // 驗證語言顯示設定
  private validateLanguageSettings(showInZh: boolean, showInEn: boolean): void {
    if (!showInZh && !showInEn) {
      throw new BadRequestException('至少需選擇一個顯示語言（中文或英文）');
    }
  }

  // 創建新聞
  async create(data: CreateNewsDto) {
    const showInZh = data.showInZh ?? true;
    const showInEn = data.showInEn ?? true;

    // 驗證語言設定
    this.validateLanguageSettings(showInZh, showInEn);

    // 驗證必填字段
    if (!data.cover) {
      throw new BadRequestException('封面圖片不能為空');
    }

    if (!data.categoryId) {
      throw new BadRequestException('分類不能為空');
    }

    // 驗證分類是否存在
    const category = await this.prisma.newsCategory.findUnique({
      where: { id: data.categoryId },
    });

    if (!category || category.deletedAt) {
      throw new BadRequestException('指定的新聞分類不存在');
    }

    return await this.prisma.news.create({
      data: {
        showInZh,
        showInEn,
        zh_title: data.zh_title ?? '',
        en_title: data.en_title ?? '',
        cover: data.cover,
        zh_description: data.zh_description ?? '',
        en_description: data.en_description ?? '',
        categoryId: data.categoryId,
        zh_content: data.zh_content ?? '',
        en_content: data.en_content ?? '',
        zh_tags: data.zh_tags ?? '',
        en_tags: data.en_tags ?? '',
        startDateTime: data.startDateTime,
        endDateTime: data.endDateTime,
        status: data.status || Status.Draft,
      },
      include: {
        category: true,
      },
    });
  }

  // 獲取所有新聞（帶分頁和搜索）
  async findAll(params: FindAllNewsParams): Promise<PaginatedNewsResult> {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 25;
    const skip = (page - 1) * limit;
    const language = params.language || 'en';
    const isZh = language === 'zh' || language === 'zh-TW' || language === 'zh-CN';

    // 構建查詢條件
    const where: any = {
      status: Status.Active, // 只返回 Active 狀態的新聞
      // 根據語言篩選顯示的新聞
      ...(isZh ? { showInZh: true } : { showInEn: true }),
    };

    // 分類篩選
    if (params.categoryId) {
      where.categoryId = params.categoryId;
    }

    // 文字搜索
    if (params.query && params.query.trim()) {
      where.OR = [
        { zh_title: { contains: params.query } },
        { en_title: { contains: params.query } },
        { zh_description: { contains: params.query } },
        { en_description: { contains: params.query } },
        { zh_tags: { contains: params.query } },
        { en_tags: { contains: params.query } },
      ];
    }

    // 獲取總記錄數
    const total = await this.prisma.news.count({ where });

    // 獲取分頁數據
    const rawData = await this.prisma.news.findMany({
      where,
      skip,
      take: limit,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 根據語系轉換數據（列表頁不包含 content 以減少流量）
    const data = rawData.map((news) => this.transformByLanguage(news, language, false));

    // 計算是否有下一頁
    const has_next = skip + data.length < total;

    return {
      data,
      pagination: {
        page,
        limit,
        has_next,
        total,
      },
    };
  }

  // 根據 ID 獲取單個新聞
  async findOne(id: string, language: string = 'en') {
    const news = await this._findOneRaw(id);
    return this.transformByLanguage(news, language);
  }

  // 管理員根據 ID 獲取單個新聞（不進行語系轉換，返回完整數據）
  async findOneByAdmin(id: string) {
    return await this._findOneRaw(id);
  }

  // 更新新聞
  async update(id: string, data: UpdateNewsDto) {
    // 先檢查新聞是否存在
    const existingNews = await this._findOneRaw(id);

    // 驗證語言設定
    const showInZh = data.showInZh ?? existingNews.showInZh;
    const showInEn = data.showInEn ?? existingNews.showInEn;
    this.validateLanguageSettings(showInZh, showInEn);

    // 如果要更新分類，驗證分類是否存在
    if (data.categoryId) {
      const category = await this.prisma.newsCategory.findUnique({
        where: { id: data.categoryId },
      });

      if (!category || category.deletedAt) {
        throw new BadRequestException('指定的新聞分類不存在');
      }
    }

    return await this.prisma.news.update({
      where: { id },
      data: {
        ...(data.showInZh !== undefined && { showInZh: data.showInZh }),
        ...(data.showInEn !== undefined && { showInEn: data.showInEn }),
        ...(data.zh_title !== undefined && { zh_title: data.zh_title }),
        ...(data.en_title !== undefined && { en_title: data.en_title }),
        ...(data.cover !== undefined && { cover: data.cover }),
        ...(data.zh_description !== undefined && {
          zh_description: data.zh_description,
        }),
        ...(data.en_description !== undefined && {
          en_description: data.en_description,
        }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
        ...(data.zh_content !== undefined && { zh_content: data.zh_content }),
        ...(data.en_content !== undefined && { en_content: data.en_content }),
        ...(data.zh_tags !== undefined && { zh_tags: data.zh_tags }),
        ...(data.en_tags !== undefined && { en_tags: data.en_tags }),
        ...(data.startDateTime !== undefined && {
          startDateTime: data.startDateTime,
        }),
        ...(data.endDateTime !== undefined && {
          endDateTime: data.endDateTime,
        }),
        ...(data.status !== undefined && { status: data.status }),
      },
      include: {
        category: true,
      },
    });
  }

  // 刪除新聞
  async remove(id: string) {
    // 先檢查新聞是否存在
    await this._findOneRaw(id);

    await this.prisma.news.delete({
      where: { id },
    });

    return { message: '新聞已成功刪除' };
  }

  // 管理員獲取所有新聞（不進行語系轉換，返回完整數據）
  async findAllByAdmin(params: FindAllByAdminParams): Promise<PaginatedNewsResult> {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 25;
    const skip = (page - 1) * limit;

    // 構建查詢條件
    const where: any = {};

    // 根據語言篩選
    if (params.language) {
      const isZh =
        params.language === 'zh' ||
        params.language === 'zh-TW' ||
        params.language === 'zh-CN';
      if (isZh) {
        where.showInZh = true;
      } else {
        where.showInEn = true;
      }
    }

    // 狀態篩選（可選）
    if (params.status) {
      where.status = params.status;
    }

    // 分類篩選
    if (params.categoryId) {
      where.categoryId = params.categoryId;
    }

    // 文字搜索
    if (params.query && params.query.trim()) {
      where.OR = [
        { zh_title: { contains: params.query } },
        { en_title: { contains: params.query } },
        { zh_description: { contains: params.query } },
        { en_description: { contains: params.query } },
        { zh_tags: { contains: params.query } },
        { en_tags: { contains: params.query } },
      ];
    }

    // 獲取總記錄數
    const total = await this.prisma.news.count({ where });

    // 獲取分頁數據
    const data = await this.prisma.news.findMany({
      where,
      skip,
      take: limit,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 計算是否有下一頁
    const has_next = skip + data.length < total;

    return {
      data,
      pagination: {
        page,
        limit,
        has_next,
        total,
      },
    };
  }
}
