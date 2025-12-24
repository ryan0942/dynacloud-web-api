import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';

// 修改文檔中 accept-language header 為非必填並移除重複
function processSwaggerDocument(document: any) {
  Object.keys(document.paths).forEach((path) => {
    Object.keys(document.paths[path]).forEach((method) => {
      const operation = document.paths[path][method];
      if (operation.parameters) {
        operation.parameters = operation.parameters.map((param) => {
          if (param.name === 'accept-language' || param.name === 'Accept-Language') {
            return { ...param, required: false };
          }
          return param;
        });
        // 移除重複的 Accept-Language header
        const seen = new Set();
        operation.parameters = operation.parameters.filter((param) => {
          const key = param.in === 'header' && (param.name === 'accept-language' || param.name === 'Accept-Language')
            ? 'accept-language-header'
            : `${param.in}-${param.name}`;
          if (seen.has(key)) {
            return false;
          }
          seen.add(key);
          return true;
        });
      }
    });
  });
  return document;
}

// 根據 tags 過濾文檔
function filterDocumentByTags(document: any, tags: string[]) {
  const filtered = JSON.parse(JSON.stringify(document)); // 深拷貝

  // 過濾 paths
  Object.keys(filtered.paths).forEach((path) => {
    Object.keys(filtered.paths[path]).forEach((method) => {
      const operation = filtered.paths[path][method];
      const operationTags = operation.tags || [];

      // 如果操作的 tag 不在允許列表中，刪除該操作
      if (!operationTags.some((tag: string) => tags.includes(tag))) {
        delete filtered.paths[path][method];
      }
    });

    // 如果 path 下沒有任何方法了，刪除整個 path
    if (Object.keys(filtered.paths[path]).length === 0) {
      delete filtered.paths[path];
    }
  });

  // 只保留使用到的 tags
  if (filtered.tags) {
    filtered.tags = filtered.tags.filter((tag: any) => tags.includes(tag.name));
  }

  return filtered;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 從 DI 容器中取得 Reflector 實例
  const reflector = app.get(Reflector);

  // 設定全域攔截器（用於成功回應）
  app.useGlobalInterceptors(new ResponseTransformInterceptor(reflector));

  // 設定全域例外過濾器（用於錯誤回應）
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: process.env.ALLOW_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  // 基礎配置
  const config = new DocumentBuilder()
    .setTitle('雲動力形象官網 API')
    .setDescription('雲動力形象官網 API 文件')
    .setVersion('1.0.0')
    .setOpenAPIVersion('3.1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: '輸入 Token 就好，不需要加 Bearer 前綴',
        in: 'header',
      },
      'JWT-auth',
    )
    // 定義 tags 順序
    .addTag('認證授權', '使用者認證相關 API')
    .addTag('管理員', '管理員功能 API')
    .addTag('檔案上傳', '檔案上傳相關 API')
    .addTag('首頁輪播Banner', '首頁輪播 Banner 管理')
    .addTag('產品服務分類', '產品服務分類管理')
    .addTag('產品服務', '產品服務管理')
    .addTag('媒體活動', '媒體活動管理')
    .addTag('媒體活動分類', '媒體活動分類管理')
    .addTag('資訊專欄', '資訊專欄管理')
    .addTag('資訊專欄類別', '資訊專欄類別管理')
    .addTag('案例分享', '案例分享管理')
    .addTag('案例分享分類', '案例分享分類管理')
    .addTag('公司資訊', '公司資訊管理')
    .addTag('關於我們', '關於我們資訊')
    .addTag('合作客戶', '合作客戶管理')
    .addTag('聯絡我們', '聯絡我們表單管理')
    .build();

  // 創建完整文檔
  let fullDocument = SwaggerModule.createDocument(app, config);
  fullDocument = processSwaggerDocument(fullDocument);

  // 定義文檔分組
  const documentGroups = {
    all: {
      name: '全部',
      document: fullDocument,
    },
    auth: {
      name: '管理員相關',
      document: processSwaggerDocument(filterDocumentByTags(fullDocument, ['認證授權', '管理員'])),
    },
    homepage: {
      name: '首頁相關',
      document: processSwaggerDocument(filterDocumentByTags(fullDocument, ['認證授權', '首頁輪播Banner', '產品服務', '媒體活動', '媒體活動分類', '資訊專欄', '資訊專欄類別', '案例分享', '案例分享分類', '公司資訊', '合作客戶', '聯絡我們'])),
    },
    news: {
      name: '媒體活動相關',
      document: processSwaggerDocument(filterDocumentByTags(fullDocument, ['認證授權', '媒體活動', '媒體活動分類'])),
    },
    blog: {
      name: '資訊專欄相關',
      document: processSwaggerDocument(filterDocumentByTags(fullDocument, ['認證授權', '資訊專欄', '資訊專欄類別'])),
    },
    case: {
      name: '案例分享相關',
      document: processSwaggerDocument(filterDocumentByTags(fullDocument, ['認證授權', '案例分享', '案例分享分類'])),
    },
    company: {
      name: '公司資訊相關',
      document: processSwaggerDocument(filterDocumentByTags(fullDocument, ['認證授權', '公司資訊', '關於我們', '聯絡我們'])),
    },
    upload: {
      name: '檔案上傳相關',
      document: processSwaggerDocument(filterDocumentByTags(fullDocument, ['認證授權', '檔案上傳'])),
    },
  };

  // 設置 JSON 端點
  Object.entries(documentGroups).forEach(([key, group]) => {
    app.getHttpAdapter().get(`/api-docs-${key}-json`, (_req, res) => {
      res.json(group.document);
    });
  });

  // 配置 Swagger UI 使用多個文檔
  SwaggerModule.setup('api-docs', app, fullDocument, {
    explorer: true,
    swaggerOptions: {
      urls: Object.entries(documentGroups).map(([key, group]) => ({
        url: `/api-docs-${key}-json`,
        name: group.name,
      })),
      operationsSorter: 'alpha',
      filter: false,
      // tagsSorter: 'alpha',
      displayRequestDuration: true,
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT || 3000);

  console.log(`Application is running on: http://localhost:${process.env.PORT || 3000}`);
  console.log(`Swagger docs available at: http://localhost:${process.env.PORT || 3000}/api-docs`);
}
bootstrap();
