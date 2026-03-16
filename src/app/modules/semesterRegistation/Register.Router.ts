import express from 'express'
import validationRequest from '../../utility/validatonJoi'
import { createRegistrationValidation } from './Registation.validation'
import { RegisterColtroller } from './Register.controller'

const Router= express.Router()


Router.post('/create-register', validationRequest(createRegistrationValidation), RegisterColtroller.createRegister)
// Router.get('/get-allCorse', corseController.getAllCorse);
// Router.get('/get-singleCorse/:_id' , corseController.getSingleCorseFromDb)
// Router.patch('/delete-Corse/:_id' , corseController.deleteCorse)
// Router.patch('/update-corse/:_id' , corseController.updateCorse)
// Router.put('/:CorseId/:assing_facalitis', validationRequest(assignFacultiesValidation), corseController.assignCorseFacalitis)
// Router.delete('/:CorseId/:deleteCorseFacalitis', validationRequest(assignFacultiesValidation), corseController.deleteFacalitisCorse)



export const RegisterRouter=Router