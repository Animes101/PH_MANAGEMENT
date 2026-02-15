
import express from 'express';
import { academicFacultyController } from './faculty.controller';
import validationRequest from '../../utility/validatonJoi';
import { createAcademicFacultySchemaValidation } from './faculty.validation';


const router= express.Router();



router.post('/create-faculty', validationRequest(createAcademicFacultySchemaValidation), academicFacultyController.createAcademicFaculty);


export const AcademicFacultyRoutes=router;