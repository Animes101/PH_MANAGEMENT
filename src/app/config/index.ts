import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: Number(process.env.PORT) || 3000,
  mongoURI: process.env.DATABASE_URL as string,
  bcrypt_Salt: process.env.bcrypt_Salt,
  DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD
};

export default config;
