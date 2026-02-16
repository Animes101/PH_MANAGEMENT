
import express from 'express';
import { academicFacultyController } from './faculty.controller';
import validationRequest from '../../utility/validatonJoi';
import { createAcademicFacultySchemaValidation } from './faculty.validation';


const router= express.Router();


router.post('/create-faculty', validationRequest(createAcademicFacultySchemaValidation), academicFacultyController.createAcademicFaculty);
router.get('/get-all-faculty', academicFacultyController.getAllAcademicFaculty);
router.get('/get-single-faculty/:id', academicFacultyController.getSingleAcademicFaculty);



export const AcademicFacultyRoutes=router;