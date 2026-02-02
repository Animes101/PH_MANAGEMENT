"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersServices = void 0;
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const createStudentIntoDB = async (studentData) => {
    const newUser = {
        id: '2330450',
        password: config_1.default.DEFAULT_PASSWORD,
        role: 'student',
    };
    //create a User
    const result = await user_model_1.UserModel.create(newUser);
    return result;
    // create a student
    if (result) {
        //setUserId
        studentData.id = result.id;
    }
};
exports.UsersServices = {
    createStudentIntoDB,
};
