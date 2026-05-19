import AppError from "../../errors/AppError";
import { adminModel } from "../admin/admin.model";
import { TeacherModel } from "../facality/facality.model";
import { OfferCourseModel } from "../offerCorse/offerCorse.model";
import { registerModel } from "../semesterRegistation/Register.model";
import { EnrolCourseStudent } from "./enrol.iterface";
import { EnrolCourseStudentModel } from "./enrol.model";
import mongoose from "mongoose";
import calculateGradePoint from "./enrolClass.utlis";
import { StudentModel } from "../student/student.model";


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
    const user_id = await StudentModel
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
updateEnrol: async (payload: Partial<EnrolCourseStudent>, facalityId: string) => {



  const {
    student,
    semesterRegistration,
    academinSemester,
    offerCorse,
    corseMark,
    ...updateData
  } = payload;

  // ✔ validate semester
  const isSemesterExits = await registerModel.findById(semesterRegistration);
  if (!isSemesterExits) throw new AppError("Semester registration not found", 404);

  // ✔ validate offer course
  const isOfferCourseExits = await OfferCourseModel.findById(offerCorse);
  if (!isOfferCourseExits) throw new AppError("Offer course not found", 404);

  // ✔ validate student
  const isStudentExits = await StudentModel.findById(student);
  if (!isStudentExits) throw new AppError("Student not found", 404);

  // ✔ validate faculty
  const facaltiExits = await TeacherModel.findOne({ id: facalityId });


  if (!facaltiExits) throw new AppError("Faculty not found", 404);

  // ✔ validate enrol exist
  const isFacalityiExits = await EnrolCourseStudentModel.findOne({
    semesterRegistration,
    academinSemester,
    offerCorse,
    student,
  });


  if (!isFacalityiExits) throw new AppError("Forbidden access faculty not found", 404);

  // 🔥 final update object
  const modifiteData: any = {
    ...updateData,
  };

  //check final term 

  if(corseMark?.finalExam){

    const totalMarks= isFacalityiExits.corseMark.classTest1 + isFacalityiExits.corseMark.classTest2 + isFacalityiExits.corseMark.classTest3 +
     isFacalityiExits.corseMark.midTerm + corseMark.finalExam;

     const greadPongAndGrade= calculateGradePoint(totalMarks);

     modifiteData.gradePoint=greadPongAndGrade.gradePoint;
     modifiteData.grade=greadPongAndGrade.grade;
     modifiteData.isComplated=true;
  }

  // 🔥 If corseMark exists then update nested fields
  if (corseMark && Object.keys(corseMark).length > 0) {
    for (const [key, value] of Object.entries(corseMark)) {
      modifiteData[`corseMark.${key}`] = value;
    }
  }



  const result= await EnrolCourseStudentModel.findByIdAndUpdate( isFacalityiExits._id, modifiteData, { new: true });

  return result

  
}

  // 👉 Delete
  // deleteEnrol: async (id: string) => {
  //   const result = await EnrolCourseStudentModel.findByIdAndDelete(id);
  //   return result;
  // },
};