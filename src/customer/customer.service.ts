import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateCustomerSortDto } from './dto/update-customer-sort.dto';

export interface CreateCustomerDto {
  zh_name: string;
  en_name: string;
  logo: string;
  url?: string;
}

export interface UpdateCustomerDto {
  zh_name?: string;
  en_name?: string;
  logo?: string;
  url?: string;
}

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  // 根據語系轉換數據
  private transformByLanguage(data: any, language: string) {
    const isZh = language === 'zh' || language === 'zh-TW' || language === 'zh-CN';

    return {
      id: data.id,
      name: isZh ? data.zh_name : data.en_name,
      logo: data.logo,
      url: data.url,
    };
  }

  // 創建合作客戶
  async create(data: CreateCustomerDto) {
    // 驗證必填字段
    if (!data.zh_name) {
      throw new BadRequestException('中文名稱不能為空');
    }
    if (!data.en_name) {
      throw new BadRequestException('英文名稱不能為空');
    }
    if (!data.logo) {
      throw new BadRequestException('Logo 不能為空');
    }
    // 取得目前最大的 sortOrder，新建的放最後
    const maxSortOrder = await this.prisma.customer.aggregate({
      _max: { sortOrder: true },
    });
    const nextSortOrder = (maxSortOrder._max.sortOrder || 0) + 1;

    return await this.prisma.customer.create({
      data: {
        zh_name: data.zh_name,
        en_name: data.en_name,
        logo: data.logo,
        url: data.url,
        sortOrder: nextSortOrder,
      },
    });
  }

  // 內部方法：獲取原始數據（用於 update 和 remove）
  private async _findOneRaw(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('合作客戶不存在');
    }

    return customer;
  }

  // 獲取所有合作客戶
  async findAll(language: string = 'en') {
    const customers = await this.prisma.customer.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
    });

    return customers.map((customer) =>
      this.transformByLanguage(customer, language),
    );
  }

  // 根據 ID 獲取單個合作客戶
  async findOne(id: string, language: string = 'en') {
    const customer = await this._findOneRaw(id);
    return this.transformByLanguage(customer, language);
  }

  // 管理員獲取所有合作客戶（不進行語系轉換，返回完整數據）
  async findAllByAdmin() {
    return await this.prisma.customer.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  // 管理員根據 ID 獲取單個合作客戶（不進行語系轉換，返回完整數據）
  async findOneByAdmin(id: string) {
    return await this._findOneRaw(id);
  }

  // 更新合作客戶
  async update(id: string, data: UpdateCustomerDto) {
    // 先檢查合作客戶是否存在
    await this._findOneRaw(id);

    return await this.prisma.customer.update({
      where: { id },
      data: {
        ...(data.zh_name !== undefined && { zh_name: data.zh_name }),
        ...(data.en_name !== undefined && { en_name: data.en_name }),
        ...(data.logo !== undefined && { logo: data.logo }),
        ...(data.url !== undefined && { url: data.url }),
      },
    });
  }

  // 刪除合作客戶
  async remove(id: string) {
    // 先檢查合作客戶是否存在
    await this._findOneRaw(id);

    await this.prisma.customer.delete({
      where: { id },
    });

    return { message: '合作客戶已成功刪除' };
  }

  // 批次更新合作客戶排序
  async updateSort(data: UpdateCustomerSortDto) {
    const { orders } = data;

    // 驗證所有 ID 是否存在
    const ids = orders.map((item) => item.id);
    const existingCustomers = await this.prisma.customer.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });

    if (existingCustomers.length !== ids.length) {
      const existingIds = existingCustomers.map((c) => c.id);
      const missingIds = ids.filter((id) => !existingIds.includes(id));
      throw new NotFoundException(
        `以下客戶 ID 不存在: ${missingIds.join(', ')}`,
      );
    }

    // 使用 transaction 批次更新
    await this.prisma.$transaction(
      orders.map((item) =>
        this.prisma.customer.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    );

    // 回傳更新後的列表
    return await this.findAllByAdmin();
  }
}
