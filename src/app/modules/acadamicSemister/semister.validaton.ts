import Joi from "joi";

export const academicSemesterValidationSchem = Joi.object({
  data: Joi.object({
    name: Joi.string().valid('Autumn', 'Summer', 'Fall').required(),
    code: Joi.string().valid('01', '02', '03', '04').required(),
    year: Joi.number().integer().required(),
    startMonth: Joi.string().valid(
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ).required(),
    endMonth: Joi.string().valid(
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ).required()
  }).required()
});
