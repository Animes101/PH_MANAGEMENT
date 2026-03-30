import { EnrolCourseStudent } from "./enrol.iterface";
import { EnrolCourseStudentModel } from "./enrol.model";


export const EnrolCourseService = {
  
  // 👉 Create
  createEnrol: async (payload: EnrolCourseStudent) => {
    const result = await EnrolCourseStudentModel.create(payload);
    return result;
  },

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
};