
// export const StudentRoutes=router;

import express from 'express';
import { adminController } from './admin.controlar';

const router= express.Router();



router.get('/get-allAdin', adminController.getAllAdmin);
router.get('/single-admin/:_id', adminController.getSingleAdmin);
// router.delete('/deleteStudent/:id', studentController.deleteStudent);
// router.patch('/update/:id', validationRequest(updateStudentSchema), studentController.updateStudent);



export const adminRouter=router;