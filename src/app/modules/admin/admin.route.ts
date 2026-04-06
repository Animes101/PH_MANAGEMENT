
// export const StudentRoutes=router;

import express from 'express';
import { adminController } from './admin.controlar';
import validationRequest from '../../utility/validatonJoi';
import { updateAdminValidationSchema } from './admin.validation';
import auth from '../../../middlwares/auth';
import { User_Role } from '../user/user.constance';
// import { updateAdminValidationSchema } from './admin.validation';
// import validationRequest from '../../utility/validatonJoi';

const router= express.Router();



router.get('/get-allAdin', auth(User_Role.admin, User_Role.superAdmin), adminController.getAllAdmin);
router.get('/single-admin/:_id',auth(User_Role.admin, User_Role.superAdmin),   adminController.getSingleAdmin);
router.patch('/deleteAdmin/:_id', auth(User_Role.admin, User_Role.superAdmin), adminController.deleteAdmin);
router.patch('/updateAdmin/:_id', validationRequest(updateAdminValidationSchema) , auth(User_Role.admin, User_Role.superAdmin), adminController.upadeAdmin);




export const adminRouter=router;

