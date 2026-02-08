import express from 'express';
import { academinSemesterController } from './seminter.controlar';
import validationRequest from '../../utility/validatonJoi';
import { academicSemesterValidationSchem } from './semister.validaton';

const router= express.Router();



router.post('/create-sementer', validationRequest(academicSemesterValidationSchem),  academinSemesterController.createAcademicSemester)


export const academicSemesterRoute= router;