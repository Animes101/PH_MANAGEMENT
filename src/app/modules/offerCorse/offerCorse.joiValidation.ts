import Joi from "joi";
import { Types } from "mongoose";

// custom ObjectId validator
const objectId = (value: string, helpers: any) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid ObjectId");
  }
  return value;
};

export const createOfferCourseValidation = Joi.object({
  registationSementer: Joi.string()
    .required()
    .custom(objectId),

  academinFacaulty: Joi.string()
    .required()
    .custom(objectId),

  corse: Joi.string()
    .required()
    .custom(objectId),

  teacher: Joi.string()
    .required()
    .custom(objectId),

  maxCapacity: Joi.number()
    .required()
    .min(1),

  minCapacity: Joi.number()
    .required()
    .min(1),

  days: Joi.string()
    .valid('sunday', 'monday', 'tuesday', 'wednesday', 'thursday')
    .required(),

  startTime: Joi.string()
  .required()
  .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
  .messages({
    "string.pattern.base": "startTime must be in HH:MM format",
    "any.required": "startTime is required",
  }),

endTime: Joi.string()
  .required()
  .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
  .messages({
    "string.pattern.base": "endTime must be in HH:MM format",
    "any.required": "endTime is required",
  }),
});



export const updateOfferCourseValidation = Joi.object({
  registationSementer: Joi.string().custom(objectId),
  academinSementer: Joi.string().custom(objectId),
  academinFacaulty: Joi.string().custom(objectId),
  corse: Joi.string().custom(objectId),
  teacher: Joi.string().custom(objectId),

  maxCapacity: Joi.number().min(1),
  minCapacity: Joi.number().min(1),

  days: Joi.string().valid(
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday'
  ),

  startTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
  endTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
});