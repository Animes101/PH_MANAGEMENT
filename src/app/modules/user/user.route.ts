import express from 'express';
import { UsersContrller } from './user.controller';


const router= express.Router();


router.post('/create-Student', UsersContrller.createStudent )


export const UserRoutes=router;