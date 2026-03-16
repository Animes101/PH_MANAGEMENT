import express from 'express'
import validationRequest from '../../utility/validatonJoi'
import { createRegistrationValidation } from './Registation.validation'
import { RegisterColtroller } from './Register.controller'

const Router= express.Router()


Router.post('/create-register', validationRequest(createRegistrationValidation), RegisterColtroller.createRegister)
Router.get('/get-allRegister', RegisterColtroller.getAllReginster);
Router.get('/get-getSingleRegistrer/:_id' , RegisterColtroller.getSingleRegister)
Router.patch('/delete-Register/:_id' , RegisterColtroller.deleteRegister)
Router.patch('/update-Register/:_id' , RegisterColtroller.upadeRegister)

export const RegisterRouter=Router