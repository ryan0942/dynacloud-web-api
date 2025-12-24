import { BannerType } from '@/types/common/status';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BannerType as PrismaBannerType } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { UpdateBannerSortDto } from './dto/update-banner-sort.dto';

export interface FindAllBannerParams {
  language?: string;
}

export interface FindAllByAdminParams {
  language?: string;
}

@Injectable()
export class BannerService {
  constructor(private readonly prisma: PrismaService) {}

  // 根據語系轉換 Banner 數據
  private transformByLanguage(data: any, language: string) {
    const isZh =
      language === 'zh' || language === 'zh-TW' || language === 'zh-CN';

    return {
      id: data.id,
      image: isZh ? data.zh_image : data.en_image,
      url: isZh ? data.zh_url : data.en_url,
      link: isZh ? data.zh_link : data.en_link,
      duration: data.duration,
      type: data.type,
    };
  }

  // 驗證語言顯示設定
  private validateLanguageSettings(
    showInZh: boolean,
    showInEn: boolean,
  ): void {
    if (!showInZh && !showInEn) {
      throw new BadRequestException('至少需選擇一個顯示語言（中文或英文）');
    }
  }

  // 驗證必填欄位（根據 type 和語言設定）
  private validateRequiredFields(
    data: {
      zh_image?: string | null;
      zh_url?: string | null;
      en_image?: string | null;
      en_url?: string | null;
    },
    showInZh: boolean,
    showInEn: boolean,
    type: string,
  ): void {
    const typeStr = String(type);
    const isImage = typeStr === BannerType.Image || typeStr === 'IMAGE';
    const isVideo = typeStr === BannerType.Video || typeStr === 'VIDEO';

    if (showInZh) {
      if (isImage && !data.zh_image) {
        throw new BadRequestException('中文版 Banner 圖片不能為空');
      }
      if (isVideo && !data.zh_url) {
        throw new BadRequestException('中文版 Banner 影片連結不能為空');
      }
    }

    if (showInEn) {
      if (isImage && !data.en_image) {
        throw new BadRequestException('英文版 Banner 圖片不能為空');
      }
      if (isVideo && !data.en_url) {
        throw new BadRequestException('英文版 Banner 影片連結不能為空');
      }
    }
  }

  // 創建 Banner
  async create(data: CreateBannerDto) {
    const showInZh = data.showInZh ?? true;
    const showInEn = data.showInEn ?? true;

    // 驗證語言設定
    this.validateLanguageSettings(showInZh, showInEn);

    // 驗證必填欄位
    this.validateRequiredFields(data, showInZh, showInEn, data.type);

    // 取得目前最大的 sortOrder，新建的放最後
    const maxSortOrder = await this.prisma.banner.aggregate({
      _max: { sortOrder: true },
    });
    const nextSortOrder = (maxSortOrder._max.sortOrder || 0) + 1;

    return await this.prisma.banner.create({
      data: {
        showInZh,
        showInEn,
        zh_image: data.zh_image,
        zh_url: data.zh_url,
        zh_link: data.zh_link,
        en_image: data.en_image,
        en_url: data.en_url,
        en_link: data.en_link,
        duration: data.duration || 3,
        type: data.type,
        sortOrder: nextSortOrder,
      },
    });
  }

  // 獲取所有 Banners（用戶端，語系轉換，不含 sortOrder）
  async findAll(params: FindAllBannerParams) {
    const language = params.language || 'en';
    const isZh =
      language === 'zh' || language === 'zh-TW' || language === 'zh-CN';

    const banners = await this.prisma.banner.findMany({
      where: isZh ? { showInZh: true } : { showInEn: true },
      orderBy: {
        sortOrder: 'asc',
      },
    });

    // 根據語系轉換並排除不需要的欄位
    return banners.map((banner) => this.transformByLanguage(banner, language));
  }

  // 管理員獲取所有 Banners（包含完整資料和 sortOrder）
  async findAllByAdmin(params: FindAllByAdminParams) {
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

    return await this.prisma.banner.findMany({
      where,
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  // 根據 ID 獲取單個 Banner（用戶端，語系轉換）
  async findOne(id: string, language: string = 'en') {
    const banner = await this.prisma.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      throw new NotFoundException('Banner 不存在');
    }

    return this.transformByLanguage(banner, language);
  }

  // 管理員根據 ID 獲取單個 Banner（完整資料）
  async findOneByAdmin(id: string) {
    const banner = await this.prisma.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      throw new NotFoundException('Banner 不存在');
    }

    return banner;
  }

  // 更新 Banner
  async update(id: string, data: UpdateBannerDto) {
    // 先取得現有 Banner
    const existingBanner = await this.findOneByAdmin(id);

    // 合併現有資料和更新資料
    const showInZh = data.showInZh ?? existingBanner.showInZh;
    const showInEn = data.showInEn ?? existingBanner.showInEn;
    const type = data.type ?? existingBanner.type;

    // 驗證語言設定
    this.validateLanguageSettings(showInZh, showInEn);

    // 合併欄位值用於驗證
    const mergedData = {
      zh_image: data.zh_image ?? existingBanner.zh_image,
      zh_url: data.zh_url ?? existingBanner.zh_url,
      zh_link: data.zh_link ?? existingBanner.zh_link,
      en_image: data.en_image ?? existingBanner.en_image,
      en_url: data.en_url ?? existingBanner.en_url,
      en_link: data.en_link ?? existingBanner.en_link,
    };

    // 驗證必填欄位
    this.validateRequiredFields(mergedData, showInZh, showInEn, type);

    return await this.prisma.banner.update({
      where: { id },
      data: {
        ...(data.showInZh !== undefined && { showInZh: data.showInZh }),
        ...(data.showInEn !== undefined && { showInEn: data.showInEn }),
        ...(data.zh_image !== undefined && { zh_image: data.zh_image }),
        ...(data.zh_url !== undefined && { zh_url: data.zh_url }),
        ...(data.zh_link !== undefined && { zh_link: data.zh_link }),
        ...(data.en_image !== undefined && { en_image: data.en_image }),
        ...(data.en_url !== undefined && { en_url: data.en_url }),
        ...(data.en_link !== undefined && { en_link: data.en_link }),
        ...(data.duration !== undefined && { duration: data.duration }),
        ...(data.type !== undefined && { type: data.type }),
      },
    });
  }

  // 刪除 Banner
  async remove(id: string) {
    // 先檢查 Banner 是否存在
    await this.findOneByAdmin(id);

    await this.prisma.banner.delete({
      where: { id },
    });

    return { message: 'Banner 已成功刪除' };
  }

  // 批次更新 Banner 排序
  async updateSort(data: UpdateBannerSortDto) {
    const { orders } = data;

    // 驗證所有 ID 是否存在
    const ids = orders.map((item) => item.id);
    const existingBanners = await this.prisma.banner.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });

    if (existingBanners.length !== ids.length) {
      const existingIds = existingBanners.map((b) => b.id);
      const missingIds = ids.filter((id) => !existingIds.includes(id));
      throw new NotFoundException(
        `以下 Banner ID 不存在: ${missingIds.join(', ')}`,
      );
    }

    // 使用 transaction 批次更新
    await this.prisma.$transaction(
      orders.map((item) =>
        this.prisma.banner.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    );

    // 回傳更新後的列表（管理員版本，包含 sortOrder）
    return await this.findAllByAdmin({});
  }
}
