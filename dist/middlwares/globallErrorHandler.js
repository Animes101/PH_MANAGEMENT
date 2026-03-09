"use strict";
// import { ErrorRequestHandler } from "express";
// import { handleJoiError } from "../app/errors/Joi.Error";
// import { TErrorSources } from "../app/interface/IError";
// import AppError from "../app/errors/AppError";
// import { handleCastError } from "../app/errors/handleCastError";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const Joi_Error_1 = require("../app/errors/Joi.Error");
const AppError_1 = __importDefault(require("../app/errors/AppError"));
const handleCastError_1 = require("../app/errors/handleCastError");
const errorHandler = (error, req, res, next) => {
    // ১. ডিফল্ট ভ্যালু সেট করা
    let statusCode = error.statusCode || 500;
    let message = error.message || "Something went wrong";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    // ২. কন্ডিশন অনুযায়ী শুধু ভেরিয়েবলগুলো আপডেট করা (res.json কল করবেন না এখানে)
    if (error.isJoi) {
        const simplifiedError = (0, Joi_Error_1.handleJoiError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (error.name === "ValidationError") {
        statusCode = 400;
        message = "Validation Error";
        errorSources = Object.values(error.errors).map((err) => ({
            path: err.path,
            message: err.message,
        }));
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
        errorSources = [
            {
                path: "",
                message: error?.message,
            },
        ];
    }
    else if (error instanceof Error) {
        message = error?.message;
        errorSources = [
            {
                path: "",
                message: error?.message,
            },
        ];
    }
    // ৩. ফাইনাল রেসপন্স (পুরো ফাংশনে মাত্র একবারই এই লাইনটি থাকবে)
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        // stack: process.env.NODE_ENV === 'development' ? error.stack : null, // ডিবাগিংয়ের জন্য চাইলে রাখতে পারেন
    });
};
exports.errorHandler = errorHandler;
