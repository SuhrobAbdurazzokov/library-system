"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    API_PORT: Number(process.env.API_PORT),
    DB_URI: String(process.env.NODE_ENV) === 'dev'
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
//# sourceMappingURL=index.js.map