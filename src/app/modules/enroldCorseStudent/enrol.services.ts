import AppError from "../../errors/AppError";
import { adminModel } from "../admin/admin.model";
import { OfferCourseModel } from "../offerCorse/offerCorse.model";
import { EnrolCourseStudent } from "./enrol.iterface";
import { EnrolCourseStudentModel } from "./enrol.model";


export const EnrolCourseService = {

  
  // 👉 Create
  createEnrol: async (payload: Partial<EnrolCourseStudent>, userId:string) => {

    // ✔ Correct field name: offerCorse
    const offerCorseId = String(payload.offerCorseId);

    const isOfferCourseExist = await OfferCourseModel.findById(offerCorseId);

    if (!isOfferCourseExist) {
      throw new Error("Offer course not found");
    }

    const user_id= await adminModel.findOne({id:userId}).select('_id')


    const isStudentAlredyEnrolled = await EnrolCourseStudentModel.findOne({
      offerCorseId: offerCorseId,
      student: user_id?._id,
      semesterRegistration:isOfferCourseExist.registationSementer,
    });

    if(isStudentAlredyEnrolled){
      
      throw new AppError('student alredy Enroll this course', 400)
    }



    if(isOfferCourseExist.maxCapacity <= 0){

      throw new AppError('Offer course is full', 400)
    }

    const  enrollStudent={

      semesterRegistration: isOfferCourseExist.registationSementer,
          academinSemester: isOfferCourseExist.academinSemester,
          offerCorseId: isOfferCourseExist._id,
          corse: isOfferCourseExist.corse,
          student: user_id?._id,
          faculity: isOfferCourseExist.academinFacaulty,
          isEnrollerd:true,
         


    }

    


    const result = await EnrolCourseStudentModel.create(enrollStudent);
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
