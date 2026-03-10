
// export const StudentRoutes=router;

import express from 'express';
import { adminController } from './admin.controlar';
import validationRequest from '../../utility/validatonJoi';
import { updateAdminValidationSchema } from './admin.validation';
// import { updateAdminValidationSchema } from './admin.validation';
// import validationRequest from '../../utility/validatonJoi';

const router= express.Router();



router.get('/get-allAdin', adminController.getAllAdmin);
router.get('/single-admin/:_id', adminController.getSingleAdmin);
router.patch('/deleteAdmin/:_id', adminController.deleteAdmin);
router.patch('/updateAdmin/:_id', validationRequest(updateAdminValidationSchema) , adminController.upadeAdmin);




export const adminRouter=router;

