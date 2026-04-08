"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolCourseService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const admin_model_1 = require("../admin/admin.model");
const facality_model_1 = require("../facality/facality.model");
const offerCorse_model_1 = require("../offerCorse/offerCorse.model");
const Register_model_1 = require("../semesterRegistation/Register.model");
const enrol_model_1 = require("./enrol.model");
const mongoose_1 = __importDefault(require("mongoose"));
const enrolClass_utlis_1 = __importDefault(require("./enrolClass.utlis"));
const student_model_1 = require("../student/student.model");
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
            const user_id = await student_model_1.StudentModel
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
                grade: "N/A",
                isEnrollerd: true,
                isComplated: false,
                corseMark: {
                    classTest1: 0,
                    classTest2: 0,
                    classTest3: 0,
                    midTerm: 0,
                    finalExam: 0,
                },
            };
            // //check if enroll student max credit exceed
            //   const enrolledCourses = await registerModel.findOne({
            //     _id: isOfferCourseExist.registationSementer,
            //   }).select('maxCredit').session(session);
            //   //total enrolled credit 
            //   const totalEnrolledCredit = await EnrolCourseStudentModel.aggregate([
            //     { $match: {
            //         semesterRegistration: isOfferCourseExist.registationSementer,
            //         student:user_id?._id,
            //     },
            //     },
            //     {
            //       $lookup: {
            //         from: "registermodels",
            //         localField: "semesterRegistration",
            //         foreignField: "_id",
            //         as: "offerCourseDetails",
            //       },
            //     },
            //     { $unwind: "$offerCourseDetails" },
            //     {
            //       $group: {
            //         _id: null,
            //         totalCredit: { $sum: "$offerCourseDetails.maxCredit" },
            //       },
            //     },
            //   ]).session(session);
            //   console.log(totalEnrolledCredit)
            //   console.log(enrolledCourses?.maxCredit)
            //   const totalCreditAfterEnroll= totalEnrolledCredit.length > 0 ? totalEnrolledCredit[0].totalCredit :  0;
            //   if(enrolledCourses && totalCreditAfterEnroll > enrolledCourses.maxCredit){
            //     throw new AppError("Enrolling this course will exceed your maximum credit limit", 400);
            //   }
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
    },
    // 👉 Get All
    // getAllEnrol: async () => {
    //   const result = await EnrolCourseStudentModel.find().populate([
    //     "semesterRegistration",
    //     "academinSemester",
    //     "academicDepartment",
    //     "offerCorse",
    //     "corse",
    //     "student",
    //     "faculity",
    //   ]);
    //   return result;
    // },
    // // 👉 Get Single
    // getSingleEnrol: async (id: string) => {
    //   const result = await EnrolCourseStudentModel.findById(id).populate([
    //     "semesterRegistration",
    //     "academinSemester",
    //     "academicDepartment",
    //     "offerCorse",
    //     "corse",
    //     "student",
    //     "faculity",
    //   ]);
    //   return result;
    // },
    // 👉 Update
    updateEnrol: async (payload, facalityId) => {
        const { student, semesterRegistration, academinSemester, offerCorse, corseMark, ...updateData } = payload;
        // ✔ validate semester
        const isSemesterExits = await Register_model_1.registerModel.findById(semesterRegistration);
        if (!isSemesterExits)
            throw new AppError_1.default("Semester registration not found", 404);
        // ✔ validate offer course
        const isOfferCourseExits = await offerCorse_model_1.OfferCourseModel.findById(offerCorse);
        if (!isOfferCourseExits)
            throw new AppError_1.default("Offer course not found", 404);
        // ✔ validate student
        const isStudentExits = await admin_model_1.adminModel.findById(student);
        if (!isStudentExits)
            throw new AppError_1.default("Student not found", 404);
        // ✔ validate faculty
        const facaltiExits = await facality_model_1.TeacherModel.findOne({ id: facalityId });
        if (!facaltiExits)
            throw new AppError_1.default("Faculty not found", 404);
        // ✔ validate enrol exist
        const isFacalityiExits = await enrol_model_1.EnrolCourseStudentModel.findOne({
            semesterRegistration,
            academinSemester,
            offerCorse,
            student,
            faculity: facaltiExits?._id,
        });
        if (!isFacalityiExits)
            throw new AppError_1.default("Forbidden access faculty not found", 404);
        // 🔥 final update object
        const modifiteData = {
            ...updateData,
        };
        //check final term 
        if (corseMark?.finalExam) {
            const totalMarks = isFacalityiExits.corseMark.classTest1 + isFacalityiExits.corseMark.classTest2 + isFacalityiExits.corseMark.classTest3 +
                isFacalityiExits.corseMark.midTerm + corseMark.finalExam;
            const greadPongAndGrade = (0, enrolClass_utlis_1.default)(totalMarks);
            console.log(greadPongAndGrade);
            modifiteData.gradePoint = greadPongAndGrade.gradePoint;
            modifiteData.grade = greadPongAndGrade.grade;
            modifiteData.isComplated = true;
        }
        // 🔥 If corseMark exists then update nested fields
        if (corseMark && Object.keys(corseMark).length > 0) {
            for (const [key, value] of Object.entries(corseMark)) {
                modifiteData[`corseMark.${key}`] = value;
            }
        }
        const result = await enrol_model_1.EnrolCourseStudentModel.findByIdAndUpdate(isFacalityiExits._id, modifiteData, { new: true });
        return result;
    }
    // 👉 Delete
    // deleteEnrol: async (id: string) => {
    //   const result = await EnrolCourseStudentModel.findByIdAndDelete(id);
    //   return result;
    // },
};
