import AppError from "../../errors/AppError";
import { AcademicFacultyModel } from "../academicFaculty/faculty.model";
// import { academinDepertModel } from "../acdemonDepermant/academinDepertMent.model";
import { CorseModel } from "../corses/corse.model";
import { TeacherModel } from "../facality/facality.model";
import { registerModel } from "../semesterRegistation/Register.model";
import { TofferCorse } from "./offerCorse.interface";
import { OfferCourseModel } from "./offerCorse.model";


const createOfferCourseIntoDB = async (payload: TofferCorse) => {

  // 🔍 1. Check Registration Semester exists
  const registrationSemester = await registerModel.findById(
    payload.registationSementer
  );

  if (!registrationSemester) {
    throw new AppError("Registration semester not found", 404);
  }

  // 🔍 2. Check Academic Faculty exists
  const academicFaculty = await AcademicFacultyModel.findById(
    payload.academinFacaulty
  );

  if (!academicFaculty) {
    throw new AppError("Academic faculty not found", 404);
  }

  // 🔍 3. Check Course exists
  const course = await CorseModel.findById(payload.corse);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  // 🔍 4. Check Teacher exists
  const teacher = await TeacherModel.findById(payload.teacher);

  if (!teacher) {
    throw new AppError("Teacher not found", 404);
  }

  // 🔍 5. Get Academic Semester from registration
  const academicSemester = registrationSemester.academinSemister;

  // 🔴 6. Capacity validation
  if (payload.minCapacity > payload.maxCapacity) {
    throw new AppError(
      "Minimum capacity cannot be greater than maximum capacity",
      400
    );
  }

  // 🔴 7. Time validation (HH:mm string compare works here)
  if (payload.startTime >= payload.endTime) {
    throw new AppError(
      "Start time must be earlier than end time",
      400
    );
  }

  // 🔴 8. Conflict check (same teacher + same day + overlapping time)
  const isConflict = await OfferCourseModel.findOne({
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
    throw new AppError(
      "This teacher already has a class scheduled at this time",
      409 // conflict status code ✅
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
  const result = await OfferCourseModel.create({
    ...payload,
    academinSemester: academicSemester,
  });

  return result;
};

const getAllOfferCoursesFromDB = async () => {
  const result = await OfferCourseModel.find()
    .populate("teacher")
    .populate("corse")
    .populate("academinSementer");

  return result;
};

const getSingleOfferCourseFromDB = async (_id: string) => {
  const result = await OfferCourseModel.findById(_id)
    .populate("teacher")
    .populate("corse");

  if (!result) {
    throw new AppError("Offer Course not found", 401);
  }

  return result;
};

const updateOfferCourseIntoDB = async (
  _id: string,
  payload: Partial<TofferCorse>
) => {

  const existing = await OfferCourseModel.findById(_id);

  if (!existing) {
    throw new AppError("Offer Course not found", 401);
  }

  // optional validation
  if (
    payload.minCapacity &&
    payload.maxCapacity &&
    payload.minCapacity > payload.maxCapacity
  ) {
    throw new AppError(
      "minCapacity cannot be greater than maxCapacity",
      401
    );
  }

  const result = await OfferCourseModel.findByIdAndUpdate(_id, payload, {
    new: true,
  });

  return result;
};

const deleteOfferCourseFromDB = async (_id: string) => {
  const result = await OfferCourseModel.findByIdAndDelete(_id);

  if (!result) {
    throw new AppError("Offer Course not found", 401);
  }

  return result;
};

export const OfferCourseServices = {
  createOfferCourseIntoDB,
  getAllOfferCoursesFromDB,
  getSingleOfferCourseFromDB,
  updateOfferCourseIntoDB,
  deleteOfferCourseFromDB,
};