"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const Joi_Error_1 = require("../app/errors/Joi.Error");
const AppError_1 = __importDefault(require("../app/errors/AppError"));
const handleCastError_1 = require("../app/errors/handleCastError");
const errorHandler = (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Something went wrong";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    // 👉 Joi Error Handle
    if (error.isJoi) {
        const simplifiedError = (0, Joi_Error_1.handleJoiError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
        res.status(statusCode).json({
            success: false,
            message,
            errorSources,
        });
    }
    else if (error.name === "ValidationError") {
        statusCode = 400;
        message = "Validation Error";
        errorSources = Object.values(error.errors).map((err) => ({
            path: err.path,
            message: err.message,
        }));
        res.status(statusCode).json({
            success: false,
            message,
            errorSources,
        });
    }
    else if (error.name === "CastError") {
        const simplifiedError = (0, handleCastError_1.handleCastError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (error instanceof AppError_1.default) {
        statusCode = error?.statusCode;
        message = error?.message;
        errorSources = [{
                path: '',
                message: error?.message,
            }];
        res.status(statusCode).json({
            success: false,
            message,
            errorSources,
        });
    }
    else if (error instanceof Error) {
        statusCode = 500;
        message = "Somthin Went Wrong";
        errorSources = [{
                path: '',
                message: error?.message,
            }];
        res.status(statusCode).json({
            success: false,
            message,
            errorSources,
        });
    }
    // ✅ ONLY ONE RESPONSE SEND HERE
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
    });
};
exports.errorHandler = errorHandler;
