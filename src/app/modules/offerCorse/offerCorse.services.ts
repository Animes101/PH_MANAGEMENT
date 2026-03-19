import AppError from "../../errors/AppError";
import { AcademicFacultyModel } from "../academicFaculty/faculty.model";
import { CorseModel } from "../corses/corse.model";
import { TeacherModel } from "../facality/facality.model";
import { registerModel } from "../semesterRegistation/Register.model";
import { TofferCorse } from "./offerCorse.interface";
import { OfferCourseModel } from "./offerCorse.model";


const createOfferCourseIntoDB = async (payload: TofferCorse) => {

  //academinSemester Exits

  const academinSementerRegisterExits= await  registerModel.findOne({_id:payload.registationSementer})

  if(!academinSementerRegisterExits){

    throw new AppError('academin Semester Registatin not Found' , 401)


  }


  const academinFacalityExits= await  AcademicFacultyModel.findOne({_id:payload.academinFacaulty})

  if(!academinFacalityExits){

    throw new AppError('academin Semester  REgister  not Found' , 401)


  }

  const corseExits= await  CorseModel.findOne({_id:payload.corse})

  if(!corseExits){

    throw new AppError('academin Semester corse not Found' , 401)


  }


  const teacheExits= await  TeacherModel.findOne({_id:payload.teacher})

  if(!teacheExits){

    throw new AppError('academin Semester Teacher not Found' , 401)


  }

  const academinSemester= academinSementerRegisterExits?.academinSemister;


  // 🔴 capacity check
  if (payload.minCapacity > payload.maxCapacity) {
    throw new AppError(
      "minCapacity cannot be greater than maxCapacity",
      401
    );
  }

  // 🔴 time check
  if (payload.startTime >= payload.endTime) {
    throw new AppError(
      "Start time must be less than end time",
      401
    );
  }

  // 🔴 conflict check (same teacher + same day + time overlap)
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
      "This teacher already has a class at this time",
      401
    );
  }

  const result = await OfferCourseModel.create({...payload, academinSemester});
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