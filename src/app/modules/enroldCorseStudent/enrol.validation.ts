import Joi from "joi";


export const enrolCourseStudentJoi = Joi.object({

    offerCorse: Joi.string().required(),
  
});


export const enrollCorseUpdateJoi=Joi.object({
    student:Joi.string().required(),
    semesterRegistration:Joi.string().required(),
    offerCorse:Joi.string().required(),
    academinSemester:Joi.string().required(),
     corseMark:Joi.object({
        classTest1: Joi.number().min(0).max(10),
        classTest2: Joi.number().min(0).max(10),
        classTest3: Joi.number().min(0).max(10),
        midTerm: Joi.number().min(0).max(20),
        finalExam: Joi.number().min(0).max(50),
    }),
    grade: Joi.string().valid('A', 'B', 'C', 'D', 'F', 'N/A'),
    isComplated: Joi.boolean(),

});