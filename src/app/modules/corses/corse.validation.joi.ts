import Joi from "joi";

export const createCourseValidationSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Title is required",
  }),

  prefix: Joi.string().required().messages({
    "string.empty": "Prefix is required",
  }),

  code: Joi.number().required().messages({
    "number.base": "Code must be a number",
  }),

  isDelete: Joi.boolean().default(false),

  preRequisiteCorse: Joi.array().items(
    Joi.object({
      corse: Joi.string().required().messages({
        "string.empty": "Course ID is required",
      }),

      isDelete: Joi.boolean().default(false),
    })
  ),
})