import express from 'express';
import { academinSemesterController } from './seminter.controlar';
import validationRequest from '../../utility/validatonJoi';
import { academicSemesterValidationSchem } from './semister.validaton';

const router= express.Router();



router.post('/create-sementer', validationRequest(academicSemesterValidationSchem),  academinSemesterController.createAcademicSemester);
router.get('/get-all-semesters', academinSemesterController.getAllAcademicSemesters);
router.get('/get-single-semester/:id', academinSemesterController.getSingleAcademicSemester);


export const academicSemesterRoute= router;