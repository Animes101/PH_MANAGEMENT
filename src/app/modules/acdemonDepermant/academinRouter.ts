import express from 'express';
import { academinControlar } from './academinControlar';
import auth from '../../../middlwares/auth';
import { User_Role } from '../user/user.constance';
import validationRequest from '../../utility/validatonJoi';
import { academinDepartmentValidaton } from './academinDepartment.validatoin';
// import validationRequest from '../../utility/validatonJoi';
// import { academinDepartmentValidaton } from './academinDepartment.validatoin';

const router= express.Router();


router.post('/create-AcademinDepartment', auth(User_Role.superAdmin, User_Role.admin),  validationRequest(academinDepartmentValidaton), academinControlar.createAcademinDepartment)
router.get('/get-all-AcademinDepartment',  auth(User_Role.superAdmin, User_Role.admin),   academinControlar.ageAllAcademinDepartment);
router.get('/get-single-AcademinDepartment/:id', auth(User_Role.superAdmin, User_Role.admin),academinControlar.getSingleAcademinDepartment);
router.put('/update-AcademinDepartment/:id', auth(User_Role.superAdmin, User_Role.admin), academinControlar.updateAcademinDepartment);

export const academinRouterDepartment=router;
