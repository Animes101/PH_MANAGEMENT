
import express from 'express';
import { academicFacultyController } from './faculty.controller';


const router= express.Router();



router.post('/create-faculty', academicFacultyController.createAcademicFaculty);


export const AcademicFacultyRoutes=router;