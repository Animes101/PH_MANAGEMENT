"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolCourseService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const admin_model_1 = require("../admin/admin.model");
const offerCorse_model_1 = require("../offerCorse/offerCorse.model");
const Register_model_1 = require("../semesterRegistation/Register.model");
const enrol_model_1 = require("./enrol.model");
const mongoose_1 = __importDefault(require("mongoose"));
exports.EnrolCourseService = {
    createEnrol: async (payload, userId) => {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const offerCorseId = String(payload.offerCorse);
            // 1️⃣ Offer course check
            const isOfferCourseExist = await offerCorse_model_1.OfferCourseModel.findById(offerCorseId).session(session);
            if (!isOfferCourseExist) {
                throw new AppError_1.default("Offer course not found", 404);
            }
            // 2️⃣ Find student _id
            const user_id = await admin_model_1.adminModel
                .findOne({ id: userId })
                .select("_id")
                .session(session);
            // 3️⃣ Check already enrolled
            const isAlreadyEnrolled = await enrol_model_1.EnrolCourseStudentModel.findOne({
                offerCorse: offerCorseId,
                student: user_id?._id,
                semesterRegistration: isOfferCourseExist.registationSementer,
            }).session(session);
            if (isAlreadyEnrolled) {
                throw new AppError_1.default("Student already enrolled this course", 400);
            }
            // 4️⃣ Check max capacity
            if (isOfferCourseExist.maxCapacity <= 0) {
                throw new AppError_1.default("Offer course is full", 400);
            }
            // 5️⃣ Create enrollment object
            const enrollStudent = {
                semesterRegistration: isOfferCourseExist.registationSementer,
                academinSemester: isOfferCourseExist.academinSemester,
                offerCorse: offerCorseId,
                corse: isOfferCourseExist.corse,
                student: user_id?._id,
                faculity: isOfferCourseExist.academinFacaulty,
                isEnrollerd: true,
                grade: "F",
                isComplated: false,
                corseMark: {
                    classTest1: 0,
                    classTest2: 0,
                    classTest3: 0,
                    midTerm: 0,
                    finalExam: 0,
                },
            };
            //check if enroll student max credit exceed
            const enrolledCourses = await Register_model_1.registerModel.findOne({
                _id: isOfferCourseExist.registationSementer,
            }).select('maxCredit').session(session);
            //total enrolled credit 
            const totalEnrolledCredit = await enrol_model_1.EnrolCourseStudentModel.aggregate([
                { $match: {
                        semesterRegistration: isOfferCourseExist.registationSementer,
                        student: user_id?._id,
                    },
                },
                {
                    $lookup: {
                        from: "registermodels",
                        localField: "semesterRegistration",
                        foreignField: "_id",
                        as: "offerCourseDetails",
                    },
                },
                { $unwind: "$offerCourseDetails" },
                {
                    $group: {
                        _id: null,
                        totalCredit: { $sum: "$offerCourseDetails.maxCredit" },
                    },
                },
            ]).session(session);
            console.log(totalEnrolledCredit);
            // 6️⃣ Enroll create (transactional)
            const result = await enrol_model_1.EnrolCourseStudentModel.create([enrollStudent], { session });
            if (!result || result.length === 0) {
                throw new AppError_1.default("Failed to enroll course", 500);
            }
            // 7️⃣ Update offerCourse capacity
            await offerCorse_model_1.OfferCourseModel.findByIdAndUpdate(offerCorseId, { $inc: { maxCapacity: -1 } }, { session });
            // 8️⃣ Commit transaction
            await session.commitTransaction();
            session.endSession();
            return result[0];
        }
        catch (error) {
            // ❌ Rollback
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }
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
