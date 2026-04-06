
// export const StudentRoutes=router;

import express from 'express';
import { studentController } from './student.controller';
import validationRequest from '../../utility/validatonJoi';
import { updateStudentSchema } from './student.validation';
import auth from '../../../middlwares/auth';
import { User_Role } from '../user/user.constance';


const router= express.Router();



router.get('/getStudent', auth(User_Role.faculity, User_Role.admin, User_Role.superAdmin), studentController.getAllStudents);
router.get('/singleStudent/:_id', auth(User_Role.admin, User_Role.faculity, User_Role.superAdmin), studentController.getSingleStudent);
router.delete('/deleteStudent/:id', auth(User_Role.admin, User_Role.superAdmin), studentController.deleteStudent);
router.patch('/update/:id', auth(User_Role.admin, User_Role.superAdmin), validationRequest(updateStudentSchema), studentController.updateStudent);



export const StudentRoutes=router;


