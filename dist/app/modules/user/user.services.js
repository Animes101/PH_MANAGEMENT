"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersServices = exports.createAdminIntoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const acadamin_model_1 = require("../acadamicSemister/acadamin.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const facality_model_1 = require("../facality/facality.model");
const academinDepertMent_model_1 = require("../acdemonDepermant/academinDepertMent.model");
const admin_model_1 = require("../admin/admin.model");
//create Student into DB
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
        needPassword: false,
        email: studentData.email,
        role: 'student',
    };
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // create user
        const userNew = await user_model_1.UserModel.create([newUser], { session });
        if (!userNew.length) {
            throw new AppError_1.default("User creation failed", 400);
        }
        // set user data
        studentData.id = userNew[0].id;
        studentData.user = userNew[0]._id;
        const result = await student_model_1.StudentModel.create([studentData], { session });
        await session.commitTransaction();
        await session.endSession();
        return result;
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
};
//createFacality into Db
const createFacalityintoDb = async (payload) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // 1. Check if academic semester exists
        const academicSemester = await academinDepertMent_model_1.academinDepertModel.findById(payload.department);
        if (!academicSemester) {
            throw new AppError_1.default('Academic semester not found', 404);
        }
        // 2. Check if email already exists
        const existingUser = await facality_model_1.TeacherModel.findOne({ email: payload.email });
        if (existingUser) {
            throw new AppError_1.default("Email already exists", 400);
        }
        // 3️⃣ Generate Faculty ID
        const facultyId = await (0, user_utils_1.generateFacultyId)();
        // 3. Create User
        const newUser = {
            id: facultyId,
            password: config_1.default.DEFAULT_PASSWORD,
            needPassword: false,
            email: payload.email, // ideally hash this
            role: 'faculity',
        };
        const userNew = await user_model_1.UserModel.create([newUser], { session });
        // 4. Create Student linked to the user
        payload.id = userNew[0].id;
        payload.user = userNew[0]._id;
        const studentNew = await facality_model_1.TeacherModel.create([payload], { session });
        // 5. Commit Transaction
        await session.commitTransaction();
        session.endSession();
        return studentNew[0]; // return the created student
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error; // re-throw for controller to handle
    }
};
const createAdminIntoDB = async (payload) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // 1️⃣ Check if email already exists
        const existingUser = await admin_model_1.adminModel.findOne({ email: payload.email });
        if (existingUser) {
            throw new AppError_1.default("Email already exists", 400);
        }
        // 2️⃣ Generate Admin ID
        const adminId = await (0, user_utils_1.generateAdminId)();
        // 3️⃣ Create User
        const newUser = {
            id: adminId,
            password: config_1.default.DEFAULT_PASSWORD,
            needPassword: false,
            email: payload.email, // ideally hash this
            role: "admin",
        };
        const userNew = await user_model_1.UserModel.create([newUser], { session });
        if (!userNew.length) {
            throw new AppError_1.default("User creation failed", 500);
        }
        // 4️⃣ Create Admin Profile linked to user
        payload.id = userNew[0].id;
        payload.user = userNew[0]._id;
        const adminNew = await admin_model_1.adminModel.create([payload], { session });
        // 5️⃣ Commit Transaction
        await session.commitTransaction();
        await session.endSession();
        return adminNew[0]; // return created admin
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
};
exports.createAdminIntoDB = createAdminIntoDB;
exports.UsersServices = {
    createStudentIntoDB,
    createFacalityintoDb,
    createAdminIntoDB: exports.createAdminIntoDB,
};
