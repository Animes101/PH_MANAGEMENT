"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferCourseServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const faculty_model_1 = require("../academicFaculty/faculty.model");
// import { academinDepertModel } from "../acdemonDepermant/academinDepertMent.model";
const corse_model_1 = require("../corses/corse.model");
const facality_model_1 = require("../facality/facality.model");
const Register_model_1 = require("../semesterRegistation/Register.model");
const offerCorse_model_1 = require("./offerCorse.model");
const createOfferCourseIntoDB = async (payload) => {
    // 🔍 1. Check Registration Semester exists
    const registrationSemester = await Register_model_1.registerModel.findById(payload.registationSementer);
    if (!registrationSemester) {
        throw new AppError_1.default("Registration semester not found", 404);
    }
    // 🔍 2. Check Academic Faculty exists
    const academicFaculty = await faculty_model_1.AcademicFacultyModel.findById(payload.academinFacaulty);
    if (!academicFaculty) {
        throw new AppError_1.default("Academic faculty not found", 404);
    }
    // 🔍 3. Check Course exists
    const course = await corse_model_1.CorseModel.findById(payload.corse);
    if (!course) {
        throw new AppError_1.default("Course not found", 404);
    }
    // 🔍 4. Check Teacher exists
    const teacher = await facality_model_1.TeacherModel.findById(payload.teacher);
    if (!teacher) {
        throw new AppError_1.default("Teacher not found", 404);
    }
    // 🔍 5. Get Academic Semester from registration
    const academicSemester = registrationSemester.academinSemister;
    // 🔴 6. Capacity validation
    if (payload.minCapacity > payload.maxCapacity) {
        throw new AppError_1.default("Minimum capacity cannot be greater than maximum capacity", 400);
    }
    // 🔴 7. Time validation (HH:mm string compare works here)
    if (payload.startTime >= payload.endTime) {
        throw new AppError_1.default("Start time must be earlier than end time", 400);
    }
    // 🔴 8. Conflict check (same teacher + same day + overlapping time)
    const isConflict = await offerCorse_model_1.OfferCourseModel.findOne({
        teacher: payload.teacher,
        days: payload.days,
        $or: [
            {
                startTime: { $lt: payload.endTime },
                endTime: { $gt: payload.startTime },
            },
        ],
    });
    if (isConflict) {
        throw new AppError_1.default("This teacher already has a class scheduled at this time", 409 // conflict status code ✅
        );
    }
    // // 🔍 9. Check Department under Faculty (optional but useful)
    // const department = await academinDepertModel.findOne({
    //   academinFacality: payload.academinFacaulty,
    // });
    // if (!department) {
    //   throw new AppError("No department found under this faculty", 404);
    // }
    // ✅ 10. Create Offer Course
    const result = await offerCorse_model_1.OfferCourseModel.create({
        ...payload,
        academinSemester: academicSemester,
    });
    return result;
};
const getAllOfferCoursesFromDB = async () => {
    const result = await offerCorse_model_1.OfferCourseModel.find()
        .populate("teacher")
        .populate("corse")
        .populate("academinSementer");
    return result;
};
const getSingleOfferCourseFromDB = async (_id) => {
    const result = await offerCorse_model_1.OfferCourseModel.findById(_id)
        .populate("teacher")
        .populate("corse");
    if (!result) {
        throw new AppError_1.default("Offer Course not found", 401);
    }
    return result;
};
const updateOfferCourseIntoDB = async (_id, payload) => {
    const existing = await offerCorse_model_1.OfferCourseModel.findById(_id);
    if (!existing) {
        throw new AppError_1.default("Offer Course not found", 401);
    }
    // optional validation
    if (payload.minCapacity &&
        payload.maxCapacity &&
        payload.minCapacity > payload.maxCapacity) {
        throw new AppError_1.default("minCapacity cannot be greater than maxCapacity", 401);
    }
    const result = await offerCorse_model_1.OfferCourseModel.findByIdAndUpdate(_id, payload, {
        new: true,
    });
    return result;
};
const deleteOfferCourseFromDB = async (_id) => {
    const result = await offerCorse_model_1.OfferCourseModel.findByIdAndDelete(_id);
    if (!result) {
        throw new AppError_1.default("Offer Course not found", 401);
    }
    return result;
};
exports.OfferCourseServices = {
    createOfferCourseIntoDB,
    getAllOfferCoursesFromDB,
    getSingleOfferCourseFromDB,
    updateOfferCourseIntoDB,
    deleteOfferCourseFromDB,
};
