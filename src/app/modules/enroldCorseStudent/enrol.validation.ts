import Joi from "joi";

export const enrolCourseMarkJoi = Joi.object({
  classTest1: Joi.number().required(),
  classTest2: Joi.number().required(),
  classTest3: Joi.number().required(),
  midTerm: Joi.number().required(),
  finalExam: Joi.number().required(),
});

export const enrolCourseStudentJoi = Joi.object({
  semesterRegistration: Joi.string().required(),
  academinSemester: Joi.string().required(),
  academicDepartment: Joi.string().required(),
  offerCorse: Joi.string().required(),
  corse: Joi.string().required(),
  student: Joi.string().required(),
  faculity: Joi.string().required(),

  isEnrollerd: Joi.boolean().default(false),

  corseMark: enrolCourseMarkJoi.required(),

  grade: Joi.string()
    .valid(
      "A+", "A", "A-",
      "B+", "B", "B-",
      "C+", "C", "C-",
      "D+", "D", "D-",
      "F"
    )
    .required(),

  isComplated: Joi.boolean().default(false),
});