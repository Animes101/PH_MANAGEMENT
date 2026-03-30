"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolCourseService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const admin_model_1 = require("../admin/admin.model");
const offerCorse_model_1 = require("../offerCorse/offerCorse.model");
const enrol_model_1 = require("./enrol.model");
exports.EnrolCourseService = {
    // 👉 Create
    createEnrol: async (payload, userId) => {
        // ✔ Correct field name: offerCorse
        const offerCorseId = String(payload.offerCorseId);
        const isOfferCourseExist = await offerCorse_model_1.OfferCourseModel.findById(offerCorseId);
        if (!isOfferCourseExist) {
            throw new Error("Offer course not found");
        }
        const user_id = await admin_model_1.adminModel.findOne({ id: userId }).select('_id');
        const isStudentAlredyEnrolled = await enrol_model_1.EnrolCourseStudentModel.findOne({
            offerCorseId: offerCorseId,
            student: user_id?._id,
            semesterRegistration: isOfferCourseExist.registationSementer,
        });
        if (isStudentAlredyEnrolled) {
            throw new AppError_1.default('student alredy Enroll this course', 400);
        }
        if (isOfferCourseExist.maxCapacity <= 0) {
            throw new AppError_1.default('Offer course is full', 400);
        }
        const enrollStudent = {
            semesterRegistration: isOfferCourseExist.registationSementer,
            academinSemester: isOfferCourseExist.academinSemester,
            offerCorseId: isOfferCourseExist._id,
            corse: isOfferCourseExist.corse,
            student: user_id?._id,
            faculity: isOfferCourseExist.academinFacaulty,
            isEnrollerd: true,
        };
        const result = await enrol_model_1.EnrolCourseStudentModel.create(enrollStudent);
        return result;
    },
};
// 👉 Get All
//   getAllEnrol: async () => {
//     const result = await EnrolCourseStudentModel.find().populate([
//       "semesterRegistration",
//       "academinSemester",
//       "academicDepartment",
//       "offerCorse",
//       "corse",
//       "student",
//       "faculity",
//     ]);
//     return result;
//   },
//   // 👉 Get Single
//   getSingleEnrol: async (id: string) => {
//     const result = await EnrolCourseStudentModel.findById(id).populate([
//       "semesterRegistration",
//       "academinSemester",
//       "academicDepartment",
//       "offerCorse",
//       "corse",
//       "student",
//       "faculity",
//     ]);
//     return result;
//   },
//   // 👉 Update
//   updateEnrol: async (id: string, payload: Partial<EnrolCourseStudent>) => {
//     const result = await EnrolCourseStudentModel.findByIdAndUpdate(
//       id,
//       payload,
//       { new: true }
//     );
//     return result;
//   },
//   // 👉 Delete
//   deleteEnrol: async (id: string) => {
//     const result = await EnrolCourseStudentModel.findByIdAndDelete(id);
//     return result;
//   },
