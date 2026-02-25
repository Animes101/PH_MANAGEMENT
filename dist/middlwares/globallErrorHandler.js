"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
//seting default value
const errorHandler = (error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message || "Something went wrong";
    const errorSourese = [{
            path: '',
            message: 'somthing Went Wrong'
        }];
    res.status(status).json({
        success: false,
        message,
        error,
        errorSourese
    });
};
exports.errorHandler = errorHandler;
