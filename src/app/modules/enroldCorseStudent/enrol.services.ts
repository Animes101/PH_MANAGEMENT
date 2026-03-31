import AppError from "../../errors/AppError";
import { adminModel } from "../admin/admin.model";
import { OfferCourseModel } from "../offerCorse/offerCorse.model";
import { registerModel } from "../semesterRegistation/Register.model";
import { EnrolCourseStudent } from "./enrol.iterface";
import { EnrolCourseStudentModel } from "./enrol.model";
import mongoose from "mongoose";


export const EnrolCourseService = {

  

createEnrol: async (payload: Partial<EnrolCourseStudent>, userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const offerCorseId = String(payload.offerCorse);

    // 1️⃣ Offer course check
    const isOfferCourseExist = await OfferCourseModel.findById(offerCorseId).session(session);

    if (!isOfferCourseExist) {
      throw new AppError("Offer course not found", 404);
    }

    // 2️⃣ Find student _id
    const user_id = await adminModel
      .findOne({ id: userId })
      .select("_id")
      .session(session);

    // 3️⃣ Check already enrolled
    const isAlreadyEnrolled = await EnrolCourseStudentModel.findOne({
      offerCorse: offerCorseId,
      student: user_id?._id,
      semesterRegistration: isOfferCourseExist.registationSementer,
    }).session(session);

    if (isAlreadyEnrolled) {
      throw new AppError("Student already enrolled this course", 400);
    }

    // 4️⃣ Check max capacity
    if (isOfferCourseExist.maxCapacity <= 0) {
      throw new AppError("Offer course is full", 400);
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
      const enrolledCourses = await registerModel.findOne({
        _id: isOfferCourseExist.registationSementer,
      }).select('maxCredit').session(session);


      //total enrolled credit 


      const totalEnrolledCredit = await EnrolCourseStudentModel.aggregate([
        { $match: {
            semesterRegistration: isOfferCourseExist.registationSementer,
            student:user_id?._id,

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

      console.log(totalEnrolledCredit)

    // 6️⃣ Enroll create (transactional)
    const result = await EnrolCourseStudentModel.create([enrollStudent], { session });

    if (!result || result.length === 0) {
      throw new AppError("Failed to enroll course", 500);
    }

    // 7️⃣ Update offerCourse capacity
    await OfferCourseModel.findByIdAndUpdate(
      offerCorseId,
      { $inc: { maxCapacity: -1 } },
      { session }
    );

    // 8️⃣ Commit transaction
    await session.commitTransaction();
    session.endSession();

    return result[0];
  } catch (error) {
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
