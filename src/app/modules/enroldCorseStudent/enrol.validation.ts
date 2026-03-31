import Joi from "joi";



export const enrolCourseStudentJoi = Joi.object({

    offerCorse: Joi.string().required(),
  
});