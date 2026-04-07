
// export const StudentRoutes=router;

import express from 'express';
import { facalityController } from './facality.controller';
import validationRequest from '../../utility/validatonJoi';
import { updateTeacherValidaion } from './joi.validation';
import auth from '../../../middlwares/auth';
import { User_Role } from '../user/user.constance';
const router= express.Router();




router.get('/get-facality', auth(User_Role.superAdmin, User_Role.admin), facalityController.getAllFacality);
router.get('/single-facality/:_id', auth(User_Role.superAdmin, User_Role.admin),  facalityController.getSingleFacality);
router.patch('/facalityDelete/:_id', auth(User_Role.superAdmin, User_Role.admin), facalityController.deleteFacality);
router.patch('/updateFacality/:_id', auth(User_Role.superAdmin, User_Role.admin), validationRequest(updateTeacherValidaion),  facalityController.updateFacality);




export const facalityRouter=router;
