"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Express global error middleware
const errorHandler = (error, // TypeScript এর জন্য any, বা better হলে custom Error type use করতে পারো
req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message || "Something went wrong";
    res.status(status).json({
        success: false,
        message,
        error: error,
    });
};
exports.errorHandler = errorHandler;
