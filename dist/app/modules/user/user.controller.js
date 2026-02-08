"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_services_1 = require("./user.services");
const student_validation_1 = require("../student/student.validation");
const respons_1 = __importDefault(require("../../utility/respons"));
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const createStudent = (0, catchAsync_1.default)(async (req, res, next) => {
    const { error, value } = student_validation_1.createStudentSchema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        return next(error);
    }
    // schema অনুযায়ী value.studentData আসবেই
    const result = await user_services_1.UsersServices.createStudentIntoDB(value.studentData);
    (0, respons_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Student created successfully',
        data: result,
    });
});
exports.UsersController = {
    createStudent,
};
