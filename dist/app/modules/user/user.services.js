"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersServices = void 0;
const user_model_1 = require("./user.model");
const createStudentIntoDB = async (studentData) => {
    const result = await (0, user_model_1.UserModel)(studentData);
    return result;
};
exports.UsersServices = {
    createStudentIntoDB
};
