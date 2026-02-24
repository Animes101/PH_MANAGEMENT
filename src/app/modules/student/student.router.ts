// import express from 'express';
// import { studentController } from './student.controller';
// import validationRequest from '../../utility/validatonJoi';
// import { updateStudentSchema } from './student.validation';

// const router= express.Router();



// router.get('/getStudent', studentController.getAllStudents);
// router.get('/singleStudent/:_id', studentController.getSingleStudent);
// router.delete('/deleteStudent/:id', studentController.deleteStudent);
// router.patch('/update/:id', validationRequest(updateStudentSchema), studentController.updateStudent);


// export const StudentRoutes=router;

import express from 'express';
import { studentController } from './student.controller';
import validationRequest from '../../utility/validatonJoi';
import { updateStudentSchema } from './student.validation';

const router= express.Router();



router.get('/getStudent', studentController.getAllStudents);
router.get('/singleStudent/:_id', studentController.getSingleStudent);
router.delete('/deleteStudent/:id', studentController.deleteStudent);
router.patch('/update/:id', validationRequest(updateStudentSchema), studentController.updateStudent);


export const StudentRoutes=router;