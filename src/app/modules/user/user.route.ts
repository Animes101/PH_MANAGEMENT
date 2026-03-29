import express from 'express';
import validationRequest from '../../utility/validatonJoi';
import { createStudentSchema } from '../student/student.validation';
import { UsersController } from './user.controller';
import { createTeacherValidation } from '../facality/joi.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import auth from '../../../middlwares/auth';
import { User_Role } from './user.constance';
import { upload } from '../../utils/multer';


const router= express.Router();

router.post('/user/create-Student', auth(User_Role.admin),  upload.single('file') , (req, res , next)=>{
    req.body= JSON.parse(req.body.data)
    next()
},validationRequest(createStudentSchema), UsersController.createStudent)
router.post('/user/create-facality', validationRequest(createTeacherValidation), UsersController.createFacality)
router.post('/user/create-admin', validationRequest(createAdminValidationSchema), UsersController.createAdmin)
router.get('/get-me', auth(User_Role.admin, User_Role.faculity, User_Role.student), UsersController.ageMe)

export const UserRoutes=router;

