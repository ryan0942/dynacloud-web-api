// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 檢查是否已有 admin 帳號存在（以 email 為判斷依據）
  const adminExists = await prisma.admin.findFirst();
  const hasAdmin = adminExists !== null;

  if (!hasAdmin) {
    // 使用 bcrypt hash 密碼 (這邊使用 10 個 salt rounds)
    const hashedPassword = await bcrypt.hash('admin123456', 10);

    // 建立預設 admin
    await prisma.admin.create({
      data: {
        name: 'admin',
        account: 'admin',
        password: hashedPassword,
        avatar: '',
      },
    });

    console.log('預設 admin 帳號已建立！');
  } else {
    console.log('admin 帳號已存在，無需建立。');
  }

  // 檢查是否已有 CompanyInfo 資料
  const companyInfoExists = await prisma.companyInfo.findFirst();
  const hasCompanyInfo = companyInfoExists !== null;

  if (!hasCompanyInfo) {
    // 建立預設 CompanyInfo
    await prisma.companyInfo.create({
      data: {
        zh_address: '台灣台北市',
        en_address: 'Taipei, Taiwan',
        zh_phone: '+886-2-1234-5678',
        en_phone: '+886-2-1234-5678',
        zh_email: 'info@company.com',
        en_email: 'info@company.com',
        zh_opening_time: '週一至週五 09:00-18:00',
        en_opening_time: 'Mon-Fri 09:00-18:00',
      },
    });

    console.log('預設 CompanyInfo 資料已建立！');
  } else {
    console.log('CompanyInfo 資料已存在，無需建立。');
  }

  // 檢查是否已有 About 資料
  const aboutExists = await prisma.about.findFirst();
  const hasAbout = aboutExists !== null;

  if (!hasAbout) {
    // 建立預設 About
    await prisma.about.create({
      data: {
        zh_content: '<p>關於我們的內容</p>',
        en_content: '<p>About us content</p>',
      },
    });

    console.log('預設 About 資料已建立！');
  } else {
    console.log('About 資料已存在，無需建立。');
  }

  // 檢查是否已有 PrivacyPolicy 資料
  const privacyPolicyExists = await prisma.privacyPolicy.findFirst();
  const hasPrivacyPolicy = privacyPolicyExists !== null;

  if (!hasPrivacyPolicy) {
    // 建立預設 PrivacyPolicy
    await prisma.privacyPolicy.create({
      data: {
        zh_content: '<p>隱私權政策內容</p>',
        en_content: '<p>Privacy Policy content</p>',
      },
    });

    console.log('預設 PrivacyPolicy 資料已建立！');
  } else {
    console.log('PrivacyPolicy 資料已存在，無需建立。');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
