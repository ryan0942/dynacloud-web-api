import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

export interface FindAllServiceParams {
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

export interface PaginatedServiceResult {
  data: any[];
  pagination: PaginationInfo;
}

@Injectable()
export class ServiceService {
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

  // 根據語系轉換服務數據（列表用，不包含content）
  private transformByLanguage(data: any, language: string, includeContent: boolean = false) {
    const isZh = language === 'zh' || language === 'zh-TW' || language === 'zh-CN';

    const result: any = {
      id: data.id,
      icon: data.icon,
      logo: data.logo,
      cover: data.cover,
      title: isZh ? data.zh_title : data.en_title,
      description: isZh ? data.zh_description : data.en_description,
      categoryName: isZh ? data.category?.zh_name : data.category?.en_name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    // 詳情頁才包含content
    if (includeContent) {
      result.content = isZh ? data.zh_content : data.en_content;
      result.category = this.transformCategoryByLanguage(data.category, language);
      result.status = data.status;
      delete result.categoryName; // 詳情頁用完整的category對象
    }

    return result;
  }

  // 驗證語言顯示設定
  private validateLanguageSettings(showInZh: boolean, showInEn: boolean): void {
    if (!showInZh && !showInEn) {
      throw new BadRequestException('至少需選擇一個顯示語言（中文或英文）');
    }
  }

  // 內部方法：獲取原始數據（用於 update 和 remove）
  private async _findOneRaw(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!service) {
      throw new NotFoundException('產品服務不存在');
    }

    return service;
  }

  // 創建產品服務
  async create(data: CreateServiceDto) {
    const showInZh = data.showInZh ?? true;
    const showInEn = data.showInEn ?? true;

    // 驗證語言設定
    this.validateLanguageSettings(showInZh, showInEn);

    // 驗證服務分類是否存在
    const categoryExists = await this.prisma.serviceCategory.findUnique({
      where: { id: data.categoryId },
    });

    if (!categoryExists) {
      throw new NotFoundException('服務分類不存在');
    }

    return await this.prisma.service.create({
      data: {
        showInZh,
        showInEn,
        icon: data.icon,
        logo: data.logo,
        cover: data.cover,
        zh_title: data.zh_title ?? '',
        en_title: data.en_title ?? '',
        zh_description: data.zh_description ?? '',
        en_description: data.en_description ?? '',
        zh_content: data.zh_content ?? '',
        en_content: data.en_content ?? '',
        categoryId: data.categoryId,
        status: data.status || Status.Draft,
      },
      include: {
        category: true,
      },
    });
  }

  // 獲取所有產品服務（用戶端，語系轉換，帶分頁和搜索）
  async findAll(params: FindAllServiceParams): Promise<PaginatedServiceResult> {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 25;
    const skip = (page - 1) * limit;
    const language = params.language || 'en';
    const isZh = language === 'zh' || language === 'zh-TW' || language === 'zh-CN';

    // 構建查詢條件
    const where: any = {
      status: Status.Active, // 只返回 Active 狀態的服務
      // 根據語言篩選顯示的服務
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
      ];
    }

    // 獲取總記錄數
    const total = await this.prisma.service.count({ where });

    // 獲取分頁數據
    const rawData = await this.prisma.service.findMany({
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

    // 根據語系轉換數據（列表頁不包含 content）
    const data = rawData.map((service) => this.transformByLanguage(service, language, false));

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

  // 管理員獲取所有產品服務（不進行語系轉換，返回完整數據但不包含 content）
  async findAllByAdmin(params: FindAllByAdminParams): Promise<PaginatedServiceResult> {
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
      ];
    }

    // 獲取總記錄數
    const total = await this.prisma.service.count({ where });

    // 獲取分頁數據
    const data = await this.prisma.service.findMany({
      where,
      skip,
      take: limit,
      select: {
        id: true,
        showInZh: true,
        showInEn: true,
        icon: true,
        logo: true,
        cover: true,
        zh_title: true,
        en_title: true,
        zh_description: true,
        en_description: true,
        categoryId: true,
        category: true,
        status: true,
        createdAt: true,
        updatedAt: true,
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

  // 根據 ID 獲取單個產品服務（用戶端，語系轉換）
  async findOne(id: string, language: string = 'en') {
    const service = await this._findOneRaw(id);
    return this.transformByLanguage(service, language, true);
  }

  // 管理員根據 ID 獲取單個產品服務（不進行語系轉換，返回完整數據）
  async findOneByAdmin(id: string) {
    return await this._findOneRaw(id);
  }

  // 更新產品服務
  async update(id: string, data: UpdateServiceDto) {
    // 先檢查產品服務是否存在
    const existingService = await this._findOneRaw(id);

    // 驗證語言設定
    const showInZh = data.showInZh ?? existingService.showInZh;
    const showInEn = data.showInEn ?? existingService.showInEn;
    this.validateLanguageSettings(showInZh, showInEn);

    // 如果有更新分類，驗證分類是否存在
    if (data.categoryId) {
      const categoryExists = await this.prisma.serviceCategory.findUnique({
        where: { id: data.categoryId },
      });

      if (!categoryExists) {
        throw new NotFoundException('服務分類不存在');
      }
    }

    return await this.prisma.service.update({
      where: { id },
      data: {
        ...(data.showInZh !== undefined && { showInZh: data.showInZh }),
        ...(data.showInEn !== undefined && { showInEn: data.showInEn }),
        ...(data.icon !== undefined && { icon: data.icon }),
        ...(data.logo !== undefined && { logo: data.logo }),
        ...(data.cover !== undefined && { cover: data.cover }),
        ...(data.zh_title !== undefined && { zh_title: data.zh_title }),
        ...(data.en_title !== undefined && { en_title: data.en_title }),
        ...(data.zh_description !== undefined && { zh_description: data.zh_description }),
        ...(data.en_description !== undefined && { en_description: data.en_description }),
        ...(data.zh_content !== undefined && { zh_content: data.zh_content }),
        ...(data.en_content !== undefined && { en_content: data.en_content }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
        ...(data.status !== undefined && { status: data.status }),
      },
      include: {
        category: true,
      },
    });
  }

  // 刪除產品服務
  async remove(id: string) {
    // 先檢查產品服務是否存在
    await this._findOneRaw(id);

    await this.prisma.service.delete({
      where: { id },
    });

    return { message: '產品服務已成功刪除' };
  }
}
