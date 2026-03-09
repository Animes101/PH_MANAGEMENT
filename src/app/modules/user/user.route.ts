import express from 'express';
import validationRequest from '../../utility/validatonJoi';
import { createStudentSchema } from '../student/student.validation';
import { UsersController } from './user.controller';
import { createTeacherValidation } from '../facality.ts/joi.validation';
import { createAdminValidationSchema } from '../admin.ts/admin.validation';


const router= express.Router();

router.post('/user/create-Student',validationRequest(createStudentSchema),  UsersController.createStudent)
router.post('/user/create-facality', validationRequest(createTeacherValidation), UsersController.createFacality)
router.post('/user/create-admin', validationRequest(createAdminValidationSchema), UsersController.createAdmin)

export const UserRoutes=router;