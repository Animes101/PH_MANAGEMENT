import Joi from "joi";



export const enrolCourseStudentJoi = Joi.object({

    offerCorseId: Joi.string().required(),
  
});