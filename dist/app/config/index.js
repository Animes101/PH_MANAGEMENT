"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    port: Number(process.env.PORT) || 3000,
    mongoURI: process.env.DATABASE_URL,
    bcrypt_Salt: process.env.bcrypt_Salt,
    DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD
};
exports.default = config;
