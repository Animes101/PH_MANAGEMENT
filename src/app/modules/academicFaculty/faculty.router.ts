
import express from 'express';
import { academicFacultyController } from './faculty.controller';
import validationRequest from '../../utility/validatonJoi';
import { createAcademicFacultySchemaValidation } from './faculty.validation';
import auth from '../../../middlwares/auth';
import { User_Role } from '../user/user.constance';


const router= express.Router();


router.post('/create-faculty', auth(User_Role.superAdmin, User_Role.admin), validationRequest(createAcademicFacultySchemaValidation), academicFacultyController.createAcademicFaculty);
router.get('/get-all-faculty', auth(User_Role.superAdmin, User_Role.admin),  academicFacultyController.getAllAcademicFaculty);
router.get('/get-single-faculty/:id', auth(User_Role.superAdmin, User_Role.admin),  academicFacultyController.getSingleAcademicFaculty);
router.patch('/update-faculty/:id', auth(User_Role.superAdmin, User_Role.admin),  validationRequest(createAcademicFacultySchemaValidation), academicFacultyController.updateAcademicFaculty);



export const AcademicFacultyRoutes=router;