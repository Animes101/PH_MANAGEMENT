"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (error) => {
    const errorSources = [
        {
            path: error.path,
            message: `Invalid ${error.path}: ${error.value}`,
        },
    ];
    return {
        statusCode: 400,
        message: "Invalid MongoDB ObjectId",
        errorSources,
    };
};
exports.handleCastError = handleCastError;
