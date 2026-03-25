import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: Number(process.env.PORT) || 3000,
  mongoURI: process.env.DATABASE_URL as string,
  bcrypt_Salt: process.env.bcrypt_Salt,
  DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
  JWT_ACCESS_TOKEN:process.env.JWT_ACCESS_TOKEN,
  token_txpire:process.env.token_expire,
SMTP_USER: process.env.SMTP_USER,
SMTP_PASS: process.env.SMTP_PASS,
SMTP_HOST: process.env.SMTP_HOST,
SMTP_PORT: Number(process.env.SMTP_PORT),


};

export default config;
