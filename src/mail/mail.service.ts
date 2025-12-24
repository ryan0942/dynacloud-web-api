import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import * as nodemailer from 'nodemailer';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface ContactNotificationData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/**
 * 郵件發送服務
 *
 * TODO: 請在 .env 或部署環境設定以下變數：
 * - SMTP_HOST: SMTP 伺服器位址 (Gmail 使用 smtp.gmail.com)
 * - SMTP_PORT: 連接埠 (587 for TLS, 465 for SSL)
 * - SMTP_USER: 寄件者 Email 帳號 (例如: contact@yourdomain.com)
 * - SMTP_PASS: 應用程式密碼 (請至 https://myaccount.google.com/apppasswords 產生 16 位數密碼)
 * - SMTP_FROM: 寄件者顯示名稱 (格式: "公司名稱 <email@yourdomain.com>")
 * - CONTACT_NOTIFY_EMAIL: 聯繫表單通知收件人信箱
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'), // TODO: 設定 SMTP 伺服器 (Gmail: smtp.gmail.com)
      port: this.configService.get<number>('SMTP_PORT'), // TODO: 設定連接埠 (587 or 465)
      secure: false, // true for 465, false for 587 (TLS)
      auth: {
        user: this.configService.get<string>('SMTP_USER'), // TODO: 設定寄件者 Email
        pass: this.configService.get<string>('SMTP_PASS'), // TODO: 設定應用程式密碼 (16位數)
      },
    });
  }

  /**
   * 發送聯繫表單通知郵件給管理員
   */
  async sendContactNotification(data: ContactNotificationData): Promise<void> {
    const to = this.configService.get<string>('CONTACT_NOTIFY_EMAIL'); // TODO: 設定收件人信箱
    const from = this.configService.get<string>('SMTP_FROM'); // TODO: 設定寄件者顯示名稱

    if (!to) {
      this.logger.warn('CONTACT_NOTIFY_EMAIL 未設定，跳過發送郵件');
      return;
    }

    const mailOptions: nodemailer.SendMailOptions = {
      from,
      to,
      subject: `[聯絡表單] 來自 ${data.name} 的新訊息 時間 ${dayjs().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')}`,
      html: this.buildContactEmailHtml(data),
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      this.logger.log(`聯繫通知郵件已發送: ${result.messageId}`);
    } catch (error) {
      this.logger.error('發送聯繫通知郵件失敗', error);
      throw error;
    }
  }

  private buildContactEmailHtml(data: ContactNotificationData): string {
    const timestamp = dayjs().tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:ss');

    // 品牌色系統
    const colors = {
      primary: '#1C73E8', // 主色 - 連結、CTA
      accent: '#F8B914', // 強調色 - 裝飾元素
      success: '#36A251', // 成功色 - 電話區塊
      warning: '#ef6c00', // 警示色 - 訊息區塊
      dark: '#222222', // 深色 - 邊框、文字
      text: '#333333', // 內文色
      textLight: '#666666', // 次要文字
      bgLight: '#f8f9fa', // 淺背景
    };

    return `
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>新聯繫表單通知</title>
    <!--[if mso]>
    <style type="text/css">
      table { border-collapse: collapse; }
      td { padding: 0; }
    </style>
    <![endif]-->
  </head>
  <body style="margin: 0; padding: 0; background-color: ${colors.bgLight}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft JhengHei', 'PingFang TC', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <!-- Preview Text (隱藏的預覽文字) -->
    <div style="display: none; max-height: 0; overflow: hidden;">
      來自 ${this.escapeHtml(data.name)} 的新聯繫訊息 - ${this.escapeHtml(data.message).substring(0, 50)}...
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: ${colors.bgLight}; padding: 40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" cellspacing="0" cellpadding="0" style="max-width: 560px; width: 100%;">

            <!-- Main Card -->
            <tr>
              <td style="background-color: #ffffff; border: 1px solid ${colors.textLight}; border-radius: 16px; box-shadow: 4px 4px 0 ${colors.dark};">

                <!-- Header with Logo -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding: 28px 32px 20px; text-align: center; border-bottom: 1.5px solid ${colors.dark};">
                      <img src="https://u-dynacloud.uidea.tw/logo.png" alt="DynaCloud" width="200" style="display: block; margin: 0 auto; border: 0; max-width: 200px; height: auto;" />
                    </td>
                  </tr>
                </table>

                <!-- Title Section -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding: 20px 32px; background: linear-gradient(135deg, #fff9e6 0%, #ffffff 100%); border-bottom: 1.5px solid ${colors.dark};">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="vertical-align: middle;">
                            <!-- 通知標籤 -->
                            <table role="presentation" cellspacing="0" cellpadding="0" style="margin-bottom: 8px;">
                              <tr>
                                <td style="background-color: ${colors.accent}; padding: 4px 12px; border-radius: 20px; border: 1px solid ${colors.textLight};">
                                  <span style="font-size: 11px; font-weight: 700; color: ${colors.dark}; text-transform: uppercase; letter-spacing: 0.5px;">新訊息</span>
                                </td>
                              </tr>
                            </table>
                            <h1 style="margin: 0; color: ${colors.dark}; font-size: 22px; font-weight: 800; line-height: 1.3;">聯繫表單通知</h1>
                            <p style="margin: 6px 0 0; color: ${colors.textLight}; font-size: 13px; font-weight: 500;">${timestamp}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Content Area -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding: 28px 32px 32px;">

                      <!-- 聯絡人資訊卡 -->
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
                        <tr>
                          <td style="background-color: #f0f7ff; padding: 20px 24px; border: 1px solid ${colors.textLight}; border-radius: 12px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                              <tr>
                                <td style="vertical-align: middle;">
                                  <p style="margin: 0 0 4px; font-size: 11px; color: ${colors.primary}; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">聯絡人</p>
                                  <p style="margin: 0; font-size: 20px; color: ${colors.dark}; font-weight: 700; line-height: 1.3;">${this.escapeHtml(data.name)}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- 聯絡方式 - Email -->
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 12px;">
                        <tr>
                          <td style="background-color: #fff8e6; padding: 16px 20px; border: 1px solid ${colors.textLight}; border-radius: 12px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                              <tr>
                                <td width="36" style="vertical-align: middle; padding-right: 12px;">
                                  <span style="font-size: 20px;">📧</span>
                                </td>
                                <td style="vertical-align: middle;">
                                  <p style="margin: 0 0 2px; font-size: 11px; color: #b8860b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">電子郵件</p>
                                  <a href="mailto:${this.escapeHtml(data.email)}" style="font-size: 15px; color: ${colors.primary}; text-decoration: none; font-weight: 600; word-break: break-all;">${this.escapeHtml(data.email)}</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- 聯絡方式 - Phone -->
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
                        <tr>
                          <td style="background-color: #e8f5e9; padding: 16px 20px; border: 1px solid ${colors.textLight}; border-radius: 12px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                              <tr>
                                <td width="36" style="vertical-align: middle; padding-right: 12px;">
                                  <span style="font-size: 20px;">📱</span>
                                </td>
                                <td style="vertical-align: middle;">
                                  <p style="margin: 0 0 2px; font-size: 11px; color: ${colors.success}; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">聯絡電話</p>
                                  <a href="tel:${this.escapeHtml(data.phone)}" style="font-size: 15px; color: ${colors.primary}; text-decoration: none; font-weight: 600;">${this.escapeHtml(data.phone)}</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- 訊息內容卡 -->
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
                        <tr>
                          <td style="background-color: #fff3e0; padding: 20px 24px; border: 1px solid ${colors.textLight}; border-radius: 12px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 12px;">
                              <tr>
                                <td>
                                  <span style="display: inline-block; background-color: ${colors.warning}; padding: 4px 10px; border-radius: 6px; border: 1px solid ${colors.textLight};">
                                    <span style="font-size: 11px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px;">💬 訊息內容</span>
                                  </span>
                                </td>
                              </tr>
                            </table>
                            <p style="margin: 0; font-size: 15px; color: ${colors.text}; line-height: 1.8; white-space: pre-wrap;">${this.escapeHtml(data.message).trim()}</p>
                          </td>
                        </tr>
                      </table>

                      <!-- 操作提示 -->
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="background-color: #f8f9fa; padding: 14px 18px; border-radius: 8px; border: 1px dashed #dee2e6;">
                            <p style="margin: 0; font-size: 12px; color: #6c757d; line-height: 1.6;">
                              <strong style="color: ${colors.text};">💡 提示：</strong>如需回覆此聯繫，請直接點擊上方電子郵件或撥打電話與對方聯繫。
                            </p>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                </table>

                <!-- Footer -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="background-color: ${colors.dark}; padding: 20px 32px; border-radius: 0 0 13px 13px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="text-align: center;">
                            <p style="margin: 0 0 6px; font-size: 11px; color: #aaaaaa;">此郵件由系統自動發送，請勿直接回覆</p>
                            <p style="margin: 0; font-size: 11px; color: #888888;">© ${dayjs().format('YYYY')} 雲動力資訊 DynaCloud. All rights reserved.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Spacer -->
            <tr>
              <td style="height: 24px;"></td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
  }

  /**
   * 防止 XSS 攻擊
   */
  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
  }
}
