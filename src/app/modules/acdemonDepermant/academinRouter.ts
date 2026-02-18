import express from 'express';
import { academinControlar } from './academinControlar';
import validationRequest from '../../utility/validatonJoi';

const router= express.Router();


router.post('/create-AcademinDepartment',validationRequest(), academinControlar.createAcademinDepartment)
router.get('/get-all-AcademinDepartment', academinControlar.ageAllAcademinDepartment);
router.get('/get-single-AcademinDepartment/:id', academinControlar.getSingleAcademinDepartment);
router.put('/update-AcademinDepartment/:id', academinControlar.updateAcademinDepartment);

export const academinRouter=router;