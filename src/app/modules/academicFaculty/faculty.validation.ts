

import Joi from 'joi';

export const createAcademicFacultySchemaValidation = Joi.object({
      name: Joi.string().required(),
});
