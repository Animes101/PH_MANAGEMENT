
// export const StudentRoutes=router;

import express from 'express';
import { facalityController } from './facality.controller';
const router= express.Router();




router.get('/get-allAdin', facalityController.getAllFacality);
router.get('/single-facality/:_id', facalityController.getSingleFacality);
// router.patch('/deleteAdmin/:_id', adminController.deleteAdmin);
// router.patch('/update/:_id',  adminController.upadeAdmin);




export const facalityRouter=router;
