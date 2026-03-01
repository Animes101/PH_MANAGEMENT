"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlemongoseValidationError = void 0;
const handlemongoseValidationError = (error) => {
    const errorSources = ;
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources,
    };
};
exports.handlemongoseValidationError = handlemongoseValidationError;
