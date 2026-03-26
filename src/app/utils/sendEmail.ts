import config from "../config";
import nodemailer from "nodemailer"


export const sendEmail = async (email:string, rederectLink:string) => {
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
          Hello Dear , 

          please chage your password 10 seconds visited the link , 
          thanks your, 
        </p>
        <div style="text-align: center; margin-top: 30px;">
          <p>${rederectLink}</p>
        </div>
      </div>
      <footer style="margin-top: 20px; text-align: center; color: #888; font-size: 12px;">
        <p>© 2026 Your Project Name. All rights reserved.</p>
      </footer>
    </div>
  `,
    });

    const sent= info.messageId;
    return sent
  } catch (err: any) {
    const error= err.message
    return error
  }
};