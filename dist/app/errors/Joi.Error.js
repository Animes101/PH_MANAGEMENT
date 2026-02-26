"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleJoiError = void 0;
const handleJoiError = (error) => {
    const errorSources = error.details.map((err) => ({
        path: err.path.join("."), // ✅ always string
        message: err.message.replace(/"/g, ""),
    }));
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources,
    };
};
exports.handleJoiError = handleJoiError;
