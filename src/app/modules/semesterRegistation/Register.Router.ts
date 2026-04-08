import express from 'express'
import validationRequest from '../../utility/validatonJoi'
import { createRegistrationValidation, updateValidation } from './Registation.validation'
import { RegisterColtroller } from './Register.controller'
import auth from '../../../middlwares/auth'
import { User_Role } from '../user/user.constance'

const Router= express.Router()


Router.post('/create-register', auth(User_Role.admin, User_Role.superAdmin), validationRequest(createRegistrationValidation), RegisterColtroller.createRegister)
Router.get('/get-allRegister', auth(User_Role.admin, User_Role.superAdmin, User_Role.student, User_Role.faculity), RegisterColtroller.getAllReginster);
Router.get('/get-getSingleRegistrer/:_id' , auth(User_Role.admin, User_Role.superAdmin, User_Role.student, User_Role.faculity), RegisterColtroller.getSingleRegister)
Router.patch('/delete-Register/:_id' , auth(User_Role.admin, User_Role.superAdmin), RegisterColtroller.deleteRegister)
Router.patch('/update-Register/:_id' , auth(User_Role.admin, User_Role.superAdmin), validationRequest(updateValidation), RegisterColtroller.upadeRegister)

export const RegisterRouter=Router;