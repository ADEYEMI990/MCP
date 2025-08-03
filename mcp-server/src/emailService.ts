// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();

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

import nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, body: string) {
  // Create Ethereal test account
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
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

  const previewUrl = nodemailer.getTestMessageUrl(info);
  console.log('🔗 Preview URL:', previewUrl);

  return previewUrl; // send this link to frontend if needed
}

