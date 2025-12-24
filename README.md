## 初始化資料庫
### step1 初始化 Prisma 並同步 Schema
```shell
  npx prisma migrate deploy
```

### step2 執行預設資料注入
```shell
  pnpm seed
```

### step3 生成 Prisma Client
```shell
  npx prisma generate
```


## 生成 Prisma Migration
### step1 設定 ./prisma/schema.prisma
```prisma

model Contact {
  id        Int       @id @default(autoincrement())
  name      String
  email     String?
  phone     String?
  address   String?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

### step2 生成 Migration 檔案
```shell
  npx prisma migrate dev --name XXXXXX (ex: AddContactTable)
```

### step3 重新生成 Prisma Client
```shell
  npx prisma generate
```

## 使用 Nest 建立 module
```shell
nest generate modeule xxx
```

## 使用 Nest 建立 service
```shell
nest generate service xxx
```

## 使用 Nest 建立 Controller
```shell
nest generate controller xxx
```
