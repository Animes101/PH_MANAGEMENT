"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const acadamin_model_1 = require("../acadamicSemister/acadamin.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createStudentIntoDB = async (studentData) => {
    const academinSemester = await acadamin_model_1.AcademicSemesterModel.findById(studentData.admisonSemester);
    if (!academinSemester) {
        throw new AppError_1.default('Academic semester not found', 404);
    }
    const existingUser = await student_model_1.StudentModel.findOne({ email: studentData.email });
    if (existingUser) {
        throw new AppError_1.default("Email already exists", 400);
    }
    const newUser = {
        id: await (0, user_utils_1.generatedId)(academinSemester),
        password: config_1.default.DEFAULT_PASSWORD,
        role: 'student',
    };
    const session = await mongoose_1.default.startSession();
    //create a User
    const userNew = await user_model_1.UserModel.create([newUser], { session });
    // create a student
    if (userNew) {
        //setUserId
        studentData.id = userNew[0].id;
        studentData.user = userNew[0]._id;
        const result = await student_model_1.StudentModel.create([studentData], { session });
        await session.commitTransaction();
        await session.endSession();
        return result;
    }
};
exports.UsersServices = {
    createStudentIntoDB,
};
