"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMongooseValidationError = void 0;
const handleMongooseValidationError = (error) => {
    const errorSources = Object.values(error.errors).map((err) => ({
        path: err.path,
        message: err.message,
    }));
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources,
    };
};
exports.handleMongooseValidationError = handleMongooseValidationError;
