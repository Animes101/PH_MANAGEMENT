"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationRequest = (schema) => {
    return async (req, res, next) => {
        console.log(req.body);
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return next(error);
        }
        req.body = value;
        next();
    };
};
exports.default = validationRequest;
