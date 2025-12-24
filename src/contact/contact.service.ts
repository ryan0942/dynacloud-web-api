import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { MailService } from '../mail/mail.service';

export interface FindAllContactParams {
  page?: number;
  limit?: number;
  query?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  has_next: boolean;
  total: number;
}

export interface PaginatedContactResult {
  data: any[];
  pagination: PaginationInfo;
}

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  // 創建聯絡表單
  async create(createContactDto: CreateContactDto) {
    const contact = await this.prisma.contact.create({
      data: createContactDto,
    });

    // 非同步發送郵件通知，不阻塞 API 回應
    this.mailService.sendContactNotification(createContactDto).catch((error) => {
      this.logger.error('發送聯繫通知郵件失敗', error);
    });

    return contact;
  }

  // 獲取所有聯絡表單（管理員用，帶分頁和搜索）
  async findAll(params: FindAllContactParams): Promise<PaginatedContactResult> {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 25;
    const skip = (page - 1) * limit;

    // 構建查詢條件
    const where: any = {};

    // 文字搜索 - 搜尋 name, email, phone, message
    if (params.query && params.query.trim()) {
      where.OR = [
        { name: { contains: params.query } },
        { email: { contains: params.query } },
        { phone: { contains: params.query } },
        { message: { contains: params.query } },
      ];
    }

    // 獲取總記錄數
    const total = await this.prisma.contact.count({ where });

    // 獲取分頁數據
    const data = await this.prisma.contact.findMany({
      where,
      skip,
      take: limit,
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

  // 根據 ID 獲取單一聯絡表單（管理員用）
  async findOne(id: string) {
    return await this.prisma.contact.findUnique({
      where: { id },
    });
  }

  // 刪除聯絡表單（管理員用）
  async remove(id: string) {
    return await this.prisma.contact.delete({
      where: { id },
    });
  }
}
