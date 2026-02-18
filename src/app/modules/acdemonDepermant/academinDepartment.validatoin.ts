import Joi from "joi";

export const academinDepartmentValidaton = Joi.object({
  
    name: Joi.string().required(),
    academinFacality: Joi.string().required(),
 

});
