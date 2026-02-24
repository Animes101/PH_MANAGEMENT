import Joi from 'joi';

const guardianSchema = Joi.object({
  fatherName: Joi.string().required(),
  motherName: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .required(),
});


export const createStudentSchema = Joi.object({
  studentData: Joi.object({
    name: Joi.string().min(3).max(50).required(),

    age: Joi.number().integer().min(1).max(100).required(),

    gender: Joi.string()
      .valid('MALE', 'FEMALE', 'OTHER')
      .required(),

    dateOfBirth: Joi.string()
      .isoDate()
      .required(),

    bloodGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .required(),

    address: Joi.string().required(),

    grade: Joi.string()
      .valid('A', 'B', 'C', 'D', 'F')
      .required(),

    email: Joi.string().email().required(),

    phoneNumber: Joi.string()
      .pattern(/^[0-9]{11}$/)
      .required(),

    guardian: guardianSchema.required(),

    department: Joi.string().required(),
    isDelete: Joi.boolean().required().messages({
        'boolean.base': 'isDelete must be boolean',
      }),

    isActive: Joi.string()
      .valid('active', 'inactive')
      .required(),
      admisonSemester: Joi.string().required()
  }).required(),
});


// const gurdianUpdaate = Joi.object({
//   fatherName: Joi.string().required().optional(),
//   motherName: Joi.string().required().optional(),
//   phone: Joi.string()
//     .pattern(/^[0-9]{11}$/)
//     .required().optional(),
// });

// export const updateStudentSchema = Joi.object({
//   studentData: Joi.object({
//     name: Joi.string().min(3).max(50).optional(),

//     age: Joi.number().integer().min(1).max(100).optional(),

//     gender: Joi.string()
//       .valid('MALE', 'FEMALE', 'OTHER')
//       .optional(),

//     dateOfBirth: Joi.string()
//       .isoDate()
//       .optional(),

//     bloodGroup: Joi.string()
//       .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
//       .optional(),

//     address: Joi.string().optional(),

//     grade: Joi.string()
//       .valid('A', 'B', 'C', 'D', 'F')
//       .optional(),

//     email: Joi.string().email().optional(),

//     phoneNumber: Joi.string()
//       .pattern(/^[0-9]{11}$/)
//       .optional(),

//     guardian: gurdianUpdaate.optional(),

//     department: Joi.string().optional(),

//     isDelete: Joi.boolean().optional().messages({
//       'boolean.base': 'isDelete must be boolean',
//     }),

//     isActive: Joi.string()
//       .valid('active', 'inactive')
//       .optional(),

//     admisonSemester: Joi.string().optional(),

//   }).optional(),
// });

const gurdianUpdaate = Joi.object({
  fatherName: Joi.string().required().optional(),
  motherName: Joi.string().required().optional(),
  phone: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .required().optional(),
});

export const updateStudentSchema = Joi.object({
  studentData: Joi.object({
    name: Joi.string().min(3).max(50).optional(),

    age: Joi.number().integer().min(1).max(100).optional(),

    gender: Joi.string()
      .valid('MALE', 'FEMALE', 'OTHER')
      .optional(),

    dateOfBirth: Joi.string()
      .isoDate()
      .optional(),

    bloodGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .optional(),

    address: Joi.string().optional(),

    grade: Joi.string()
      .valid('A', 'B', 'C', 'D', 'F')
      .optional(),

    email: Joi.string().email().optional(),

    phoneNumber: Joi.string()
      .pattern(/^[0-9]{11}$/)
      .optional(),

    guardian: gurdianUpdaate.optional(),

    department: Joi.string().optional(),

    isDelete: Joi.boolean().optional().messages({
      'boolean.base': 'isDelete must be boolean',
    }),

    isActive: Joi.string()
      .valid('active', 'inactive')
      .optional(),

    admisonSemester: Joi.string().optional(),

  }).optional(),
});