import Joi from "joi";
import { registerStatus } from "./Registation.comntance";

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const createRegistrationValidation = Joi.object({
  academinSemister: Joi.string()
    .pattern(objectIdPattern)
    .required()
    .messages({
      "string.pattern.base": "Invalid Academic Semester ObjectId",
      "any.required": "Academic Semester is required",
    }),

  status: Joi.string()
    .valid(...registerStatus)
    .optional(),

  startDate: Joi.date()
    .required()
    .messages({
      "date.base": "Start date must be a valid date",
      "any.required": "Start date is required",
    }),

  endDate: Joi.date()
    .required()
    .greater(Joi.ref("startDate"))
    .messages({
      "date.base": "End date must be a valid date",
      "date.greater": "End date must be greater than start date",
      "any.required": "End date is required",
    }),

  minCredit: Joi.number()
    .required()
    .messages({
      "number.base": "Min credit must be a number",
      "any.required": "Min credit is required",
    }),

  maxCredit: Joi.number()
    .required()
    .greater(Joi.ref("minCredit"))
    .messages({
      "number.base": "Max credit must be a number",
      "number.greater": "Max credit must be greater than min credit",
      "any.required": "Max credit is required",
    }),
});