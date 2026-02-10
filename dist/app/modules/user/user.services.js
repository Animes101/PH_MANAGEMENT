"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersServices = void 0;
const config_1 = __importDefault(require("../../config"));
const acadamin_model_1 = require("../acadamicSemister/acadamin.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createStudentIntoDB = async (studentData) => {
    const academinSemester = await acadamin_model_1.AcademicSemesterModel.findById(studentData.admisonSemester);
    if (!academinSemester) {
        throw new Error('Academic semester not found');
    }
    const newUser = {
        id: (0, user_utils_1.generatedId)(academinSemester),
        password: config_1.default.DEFAULT_PASSWORD,
        role: 'student',
    };
    //create a User
    const userNew = await user_model_1.UserModel.create(newUser);
    // create a student
    if (userNew) {
        //setUserId
        studentData.id = userNew.id;
        studentData.user = userNew._id;
        const result = await student_model_1.StudentModel.create(studentData);
        return result;
    }
};
exports.UsersServices = {
    createStudentIntoDB,
};
