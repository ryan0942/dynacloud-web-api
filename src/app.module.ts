import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';

import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UploadModule } from './upload/upload.module';
import { BannerModule } from './banner/banner.module';
import { ServiceModule } from './service/service.module';
import { ServiceCategoryModule } from './service-category/service-category.module';
import { NewsCategoryModule } from './news-category/news-category.module';
import { NewsModule } from './news/news.module';
import { BlogCategoryModule } from './blog-category/blog-category.module';
import { BlogModule } from './blog/blog.module';
import { CaseCategoryModule } from './case-category/case-category.module';
import { CaseModule } from './case/case.module';
import { CustomerModule } from './customer/customer.module';
import { CompanyInfoModule } from './company-info/company-info.module';
import { AboutModule } from './about/about.module';
import { ContactModule } from './contact/contact.module';
import { PrivacyPolicyModule } from './privacy-policy/privacy-policy.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30,
      },
    ]),
    ConfigModule.forRoot(),
    AuthModule,
    AdminModule,
    UploadModule,
    BannerModule,
    ServiceModule,
    ServiceCategoryModule,
    NewsCategoryModule,
    NewsModule,
    BlogCategoryModule,
    BlogModule,
    CaseCategoryModule,
    CaseModule,
    CustomerModule,
    CompanyInfoModule,
    AboutModule,
    ContactModule,
    PrivacyPolicyModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
