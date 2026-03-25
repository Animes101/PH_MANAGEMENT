import config from "../config";
import nodemailer from "nodemailer"


export const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: false,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: 'animesbarman101@gmail.com',
      to: "animesbarman096@gmail.com",
      subject: "Hello",
      text: "Hello world?",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px; background-color: #f9f9f9;">
      <h2 style="color: #4CAF50; text-align: center;">Welcome!</h2>
      <hr style="border: 0; border-top: 1px solid #eee;" />
      <div style="padding: 20px; background-color: #ffffff; border-radius: 8px;">
        <p style="font-size: 18px; color: #333;">
          <b>Hello Animes Barman,</b>
        </p>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          How are you doing today? We are excited to have you with us. 
          This is a beautifully formatted email sent directly from our Node.js application.
        </p>
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://yourwebsite.com" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Dashboard</a>
        </div>
      </div>
      <footer style="margin-top: 20px; text-align: center; color: #888; font-size: 12px;">
        <p>© 2026 Your Project Name. All rights reserved.</p>
      </footer>
    </div>
  `,
    });

    console.log("Message sent:", info.messageId);
  } catch (err: any) {
    console.error("Error while sending mail:", err.message);
  }
};