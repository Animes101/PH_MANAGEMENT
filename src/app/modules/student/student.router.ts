
// export const StudentRoutes=router;

import express from 'express';
import { studentController } from './student.controller';
import validationRequest from '../../utility/validatonJoi';
import { updateStudentSchema } from './student.validation';
import auth from '../../../middlwares/auth';
import { User_Role } from '../user/user.constance';


const router= express.Router();



router.get('/getStudent', auth(User_Role.faculity), studentController.getAllStudents);
router.get('/singleStudent/:_id', studentController.getSingleStudent);
router.delete('/deleteStudent/:id', studentController.deleteStudent);
router.patch('/update/:id', validationRequest(updateStudentSchema), studentController.updateStudent);



export const StudentRoutes=router;


