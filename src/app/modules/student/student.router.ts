import express from 'express';
import { studentController } from './student.controller';

const router= express.Router();



router.get('/getStudent', studentController.getAllStudents);
router.get('/singleStudent/:_id', studentController.getSingleStudent);
router.delete('/deleteStudent/:id', studentController.deleteStudent);


export const StudentRoutes=router;