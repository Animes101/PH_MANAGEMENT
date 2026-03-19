"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferCourseServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const faculty_model_1 = require("../academicFaculty/faculty.model");
const corse_model_1 = require("../corses/corse.model");
const facality_model_1 = require("../facality/facality.model");
const Register_model_1 = require("../semesterRegistation/Register.model");
const offerCorse_model_1 = require("./offerCorse.model");
const createOfferCourseIntoDB = async (payload) => {
    //academinSemester Exits
    const academinSementerRegisterExits = await Register_model_1.registerModel.findOne({ _id: payload.registationSementer });
    if (!academinSementerRegisterExits) {
        throw new AppError_1.default('academin Semester Registatin not Found', 401);
    }
    const academinFacalityExits = await faculty_model_1.AcademicFacultyModel.findOne({ _id: payload.academinFacaulty });
    if (!academinFacalityExits) {
        throw new AppError_1.default('academin Semester  REgister  not Found', 401);
    }
    const corseExits = await corse_model_1.CorseModel.findOne({ _id: payload.corse });
    if (!corseExits) {
        throw new AppError_1.default('academin Semester corse not Found', 401);
    }
    const teacheExits = await facality_model_1.TeacherModel.findOne({ _id: payload.teacher });
    if (!teacheExits) {
        throw new AppError_1.default('academin Semester Teacher not Found', 401);
    }
    const academinSemester = academinSementerRegisterExits?.academinSemister;
    // 🔴 capacity check
    if (payload.minCapacity > payload.maxCapacity) {
        throw new AppError_1.default("minCapacity cannot be greater than maxCapacity", 401);
    }
    // 🔴 time check
    if (payload.startTime >= payload.endTime) {
        throw new AppError_1.default("Start time must be less than end time", 401);
    }
    // 🔴 conflict check (same teacher + same day + time overlap)
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
        throw new AppError_1.default("This teacher already has a class at this time", 401);
    }
    const result = await offerCorse_model_1.OfferCourseModel.create({ ...payload, academinSemester });
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
