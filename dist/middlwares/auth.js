"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../app/errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../app/config"));
const catchAsync_1 = __importDefault(require("../app/utility/catchAsync"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)(async (req, res, next) => {
        const authHeader = req.headers.authorization;
        // ❌ no token
        if (!authHeader) {
            throw new AppError_1.default("Forbidden access: No token provided", 403);
        }
        // ✅ Bearer token split
        const token = authHeader;
        if (!token) {
            throw new AppError_1.default("Forbidden access: Invalid token format", 403);
        }
        // ✅ verify token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_ACCESS_TOKEN);
        // ✅ role check (IMPORTANT 🔥)
        if (requiredRoles.length && !requiredRoles.includes(decoded.userRole)) {
            throw new AppError_1.default("You are not authorized this role", 403);
        }
        // ✅ attach user
        req.user = decoded;
        next();
    });
};
exports.default = auth;
