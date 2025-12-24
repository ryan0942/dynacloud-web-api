import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from '../prisma.service';

export interface CreateCaseDto {
  showInZh?: boolean;
  showInEn?: boolean;
  zh_title?: string;
  en_title?: string;
  cover: string;
  zh_description?: string;
  en_description?: string;
  company_logo: string;
  zh_company_name?: string;
  en_company_name?: string;
  zh_company_description?: string;
  en_company_description?: string;
  zh_company_title?: string;
  en_company_title?: string;
  categoryId: string;
  zh_tags?: string;
  en_tags?: string;
  zh_content?: string;
  en_content?: string;
  status?: Status;
}

export interface UpdateCaseDto {
  showInZh?: boolean;
  showInEn?: boolean;
  zh_title?: string;
  en_title?: string;
  cover?: string;
  zh_description?: string;
  en_description?: string;
  company_logo?: string;
  zh_company_name?: string;
  en_company_name?: string;
  zh_company_description?: string;
  en_company_description?: string;
  zh_company_title?: string;
  en_company_title?: string;
  categoryId?: string;
  zh_tags?: string;
  en_tags?: string;
  zh_content?: string;
  en_content?: string;
  status?: Status;
}

export interface FindAllCaseParams {
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

export interface PaginatedCaseResult {
  data: any[];
  pagination: PaginationInfo;
}

@Injectable()
export class CaseService {
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

  // 根據語系轉換案例數據
  private transformByLanguage(data: any, language: string) {
    const isZh = language === 'zh' || language === 'zh-TW' || language === 'zh-CN';

    return {
      id: data.id,
      title: isZh ? data.zh_title : data.en_title,
      cover: data.cover,
      description: isZh ? data.zh_description : data.en_description,
      company_logo: data.company_logo,
      company_name: isZh ? data.zh_company_name : data.en_company_name,
      company_description: isZh ? data.zh_company_description : data.en_company_description,
      company_title: isZh ? data.zh_company_title : data.en_company_title,
      category: this.transformCategoryByLanguage(data.category, language),
      tags: isZh ? data.zh_tags : data.en_tags,
      content: isZh ? data.zh_content : data.en_content,
      status: data.status,
      updatedAt: data.updatedAt,
    };
  }

  // 驗證語言顯示設定
  private validateLanguageSettings(showInZh: boolean, showInEn: boolean): void {
    if (!showInZh && !showInEn) {
      throw new BadRequestException('至少需選擇一個顯示語言（中文或英文）');
    }
  }

  // 內部方法：獲取原始數據（用於 update 和 remove）
  private async _findOneRaw(id: string) {
    const caseData = await this.prisma.case.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!caseData) {
      throw new NotFoundException('案例不存在');
    }

    return caseData;
  }

  // 創建案例
  async create(data: CreateCaseDto) {
    const showInZh = data.showInZh ?? true;
    const showInEn = data.showInEn ?? true;

    // 驗證語言設定
    this.validateLanguageSettings(showInZh, showInEn);

    // 驗證必填字段
    if (!data.cover) {
      throw new BadRequestException('封面圖片不能為空');
    }

    if (!data.company_logo) {
      throw new BadRequestException('公司 Logo 不能為空');
    }

    if (!data.categoryId) {
      throw new BadRequestException('分類不能為空');
    }

    // 驗證分類是否存在
    const category = await this.prisma.caseCategory.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new BadRequestException('指定的案例分類不存在');
    }

    return await this.prisma.case.create({
      data: {
        showInZh,
        showInEn,
        zh_title: data.zh_title ?? '',
        en_title: data.en_title ?? '',
        cover: data.cover,
        zh_description: data.zh_description ?? '',
        en_description: data.en_description ?? '',
        company_logo: data.company_logo,
        zh_company_name: data.zh_company_name ?? '',
        en_company_name: data.en_company_name ?? '',
        zh_company_description: data.zh_company_description ?? '',
        en_company_description: data.en_company_description ?? '',
        zh_company_title: data.zh_company_title ?? '',
        en_company_title: data.en_company_title ?? '',
        categoryId: data.categoryId,
        zh_tags: data.zh_tags ?? '',
        en_tags: data.en_tags ?? '',
        zh_content: data.zh_content ?? '',
        en_content: data.en_content ?? '',
        status: data.status || Status.Draft,
      },
      include: {
        category: true,
      },
    });
  }

  // 獲取所有案例（帶分頁和搜索）
  async findAll(params: FindAllCaseParams): Promise<PaginatedCaseResult> {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 25;
    const skip = (page - 1) * limit;
    const language = params.language || 'en';
    const isZh = language === 'zh' || language === 'zh-TW' || language === 'zh-CN';

    // 構建查詢條件
    const where: any = {
      status: Status.Active, // 只返回 Active 狀態的案例
      // 根據語言篩選顯示的案例
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
        { zh_company_name: { contains: params.query } },
        { en_company_name: { contains: params.query } },
        { zh_company_description: { contains: params.query } },
        { en_company_description: { contains: params.query } },
        { zh_tags: { contains: params.query } },
        { en_tags: { contains: params.query } },
      ];
    }

    // 獲取總記錄數
    const total = await this.prisma.case.count({ where });

    // 獲取分頁數據
    const rawData = await this.prisma.case.findMany({
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

    // 根據語系轉換數據
    const data = rawData.map((caseItem) => this.transformByLanguage(caseItem, language));

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

  // 根據 ID 獲取單個案例
  async findOne(id: string, language: string = 'en') {
    const caseData = await this._findOneRaw(id);
    return this.transformByLanguage(caseData, language);
  }

  // 管理員根據 ID 獲取單個案例（不進行語系轉換，返回完整數據）
  async findOneByAdmin(id: string) {
    return await this._findOneRaw(id);
  }

  // 更新案例
  async update(id: string, data: UpdateCaseDto) {
    // 先檢查案例是否存在
    const existingCase = await this._findOneRaw(id);

    // 驗證語言設定
    const showInZh = data.showInZh ?? existingCase.showInZh;
    const showInEn = data.showInEn ?? existingCase.showInEn;
    this.validateLanguageSettings(showInZh, showInEn);

    // 如果要更新分類，驗證分類是否存在
    if (data.categoryId) {
      const category = await this.prisma.caseCategory.findUnique({
        where: { id: data.categoryId },
      });

      if (!category) {
        throw new BadRequestException('指定的案例分類不存在');
      }
    }

    return await this.prisma.case.update({
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
        ...(data.company_logo !== undefined && { company_logo: data.company_logo }),
        ...(data.zh_company_name !== undefined && {
          zh_company_name: data.zh_company_name,
        }),
        ...(data.en_company_name !== undefined && {
          en_company_name: data.en_company_name,
        }),
        ...(data.zh_company_description !== undefined && {
          zh_company_description: data.zh_company_description,
        }),
        ...(data.en_company_description !== undefined && {
          en_company_description: data.en_company_description,
        }),
        ...(data.zh_company_title !== undefined && {
          zh_company_title: data.zh_company_title,
        }),
        ...(data.en_company_title !== undefined && {
          en_company_title: data.en_company_title,
        }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
        ...(data.zh_tags !== undefined && { zh_tags: data.zh_tags }),
        ...(data.en_tags !== undefined && { en_tags: data.en_tags }),
        ...(data.zh_content !== undefined && { zh_content: data.zh_content }),
        ...(data.en_content !== undefined && { en_content: data.en_content }),
        ...(data.status !== undefined && { status: data.status }),
      },
      include: {
        category: true,
      },
    });
  }

  // 刪除案例
  async remove(id: string) {
    // 先檢查案例是否存在
    await this._findOneRaw(id);

    await this.prisma.case.delete({
      where: { id },
    });

    return { message: '案例已成功刪除' };
  }

  // 管理員獲取所有案例（不進行語系轉換，返回完整數據）
  async findAllByAdmin(params: FindAllByAdminParams): Promise<PaginatedCaseResult> {
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
        { zh_company_name: { contains: params.query } },
        { en_company_name: { contains: params.query } },
        { zh_company_description: { contains: params.query } },
        { en_company_description: { contains: params.query } },
        { zh_tags: { contains: params.query } },
        { en_tags: { contains: params.query } },
      ];
    }

    // 獲取總記錄數
    const total = await this.prisma.case.count({ where });

    // 獲取分頁數據
    const data = await this.prisma.case.findMany({
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
