import express from 'express';
import { UsersController } from './user.controller';



const router= express.Router();


router.post('/user/create-Student', UsersController.createStudent)


export const UserRoutes=router;