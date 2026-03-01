import express from 'express';
import { UsersController } from './user.controller';
import validationRequest from '../../utility/validatonJoi';
import { createStudentSchema } from '../student/student.validation';


const router= express.Router();

router.post('/user/create-Student', UsersController.createStudent)


export const UserRoutes=router;

// validationRequest(createStudentSchema), 