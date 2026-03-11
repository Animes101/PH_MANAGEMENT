
// export const StudentRoutes=router;

import express from 'express';
import { facalityController } from './facality.controller';
import validationRequest from '../../utility/validatonJoi';
import { updateTeacherValidaion } from './joi.validation';
const router= express.Router();




router.get('/get-allAdin', facalityController.getAllFacality);
router.get('/single-facality/:_id', facalityController.getSingleFacality);
router.patch('/facalityDelete/:_id', facalityController.deleteFacality);
router.patch('/updateFacality/:_id', validationRequest(updateTeacherValidaion),  facalityController.updateFacality);




export const facalityRouter=router;
