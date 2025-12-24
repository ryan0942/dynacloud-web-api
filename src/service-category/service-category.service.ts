import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';

@Injectable()
export class ServiceCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  // 根據語系轉換數據
  private transformByLanguage(data: any, language: string) {
    const isZh = language === 'zh' || language === 'zh-TW' || language === 'zh-CN';

    return {
      id: data.id,
      name: isZh ? data.zh_name : data.en_name,
    };
  }

  // 創建服務分類
  async create(data: CreateServiceCategoryDto) {
    return await this.prisma.serviceCategory.create({
      data: {
        zh_name: data.zh_name,
        en_name: data.en_name,
      },
    });
  }

  // 獲取所有服務分類（用戶端，語系轉換）
  async findAll(language: string = 'en') {
    const categories = await this.prisma.serviceCategory.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return categories.map((category) =>
      this.transformByLanguage(category, language),
    );
  }

  // 管理員獲取所有服務分類（不進行語系轉換，返回完整數據）
  async findAllByAdmin() {
    return await this.prisma.serviceCategory.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // 根據 ID 獲取單個服務分類（用戶端）
  async findOne(id: string) {
    const category = await this.prisma.serviceCategory.findUnique({
      where: { id },
      include: {
        services: true,
      },
    });

    if (!category) {
      throw new NotFoundException('服務分類不存在');
    }

    return category;
  }

  // 管理員根據 ID 獲取單個服務分類（返回完整數據）
  async findOneByAdmin(id: string) {
    const category = await this.prisma.serviceCategory.findUnique({
      where: { id },
      include: {
        services: true,
      },
    });

    if (!category) {
      throw new NotFoundException('服務分類不存在');
    }

    return category;
  }

  // 更新服務分類
  async update(id: string, data: UpdateServiceCategoryDto) {
    // 先檢查服務分類是否存在
    await this.findOne(id);

    return await this.prisma.serviceCategory.update({
      where: { id },
      data: {
        ...(data.zh_name !== undefined && { zh_name: data.zh_name }),
        ...(data.en_name !== undefined && { en_name: data.en_name }),
      },
    });
  }

  // 刪除服務分類
  async remove(id: string) {
    // 先檢查服務分類是否存在
    const category = await this.findOne(id);

    // 檢查是否有關聯的服務
    if (category.services && category.services.length > 0) {
      throw new BadRequestException(
        '無法刪除此分類，因為還有相關聯的產品服務',
      );
    }

    await this.prisma.serviceCategory.delete({
      where: { id },
    });

    return { message: '服務分類已成功刪除' };
  }
}
