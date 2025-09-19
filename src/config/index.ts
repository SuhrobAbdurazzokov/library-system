import dotenv from 'dotenv';
dotenv.config();

export const config = {
  API_PORT: Number(process.env.API_PORT),

  DB_URI:
    String(process.env.NODE_ENV) === 'dev'
      ? String(process.env.DB_URI_DEV)
      : String(process.env.DB_URI_PROD),

  DB_SYNC: String(process.env.NODE_ENV) === 'dev' ? true : false,

  ACCESS_TOKEN_SECRET_KEY: String(process.env.ACCESS_TOKEN_SECRET_KEY),
  ACCESS_TOKEN_TIME: String(process.env.ACCESS_TOKEN_TIME),
  REFRESH_TOKEN_SECRET_KEY: String(process.env.REFRESH_TOKEN_SECRET_KEY),
  REFRESH_TOKEN_TIME: String(process.env.REFRESH_TOKEN_TIME),

  ADMIN_PASSWORD: String(process.env.SUPER_ADMIN_PASSWORD),
  ADMIN_EMAIL: String(process.env.SUPER_ADMIN_EMAIL),
  ADMIN_FULLNAME: String(process.env.SUPER_ADMIN_FULLNAME),
};
