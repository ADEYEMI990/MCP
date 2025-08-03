"use strict";
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS
//   }
// });
// export async function sendEmail(to: string, subject: string, body: string) {
//   const info = await transporter.sendMail({
//     from: process.env.SMTP_USER,
//     to,
//     subject,
//     text: body
//   });
//   return info.messageId;
// }
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendEmail(to, subject, body) {
    // Create Ethereal test account
    const testAccount = await nodemailer_1.default.createTestAccount();
    const transporter = nodemailer_1.default.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });
    const info = await transporter.sendMail({
        from: `"MCP Server" <${testAccount.user}>`,
        to,
        subject,
        text: body
    });
    const previewUrl = nodemailer_1.default.getTestMessageUrl(info);
    console.log('🔗 Preview URL:', previewUrl);
    return previewUrl; // send this link to frontend if needed
}
//# sourceMappingURL=emailService.js.map