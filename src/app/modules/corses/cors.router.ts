import express from 'express'
import { corseController } from './cors.contrller'
import validationRequest from '../../utility/validatonJoi'
import { createCourseValidationSchema } from './corse.validation.joi'

const Router= express.Router()


Router.post('/create-corse', validationRequest(createCourseValidationSchema), corseController.createCorse)
Router.get('/get-allCorse', corseController.getAllCorse);
Router.get('/get-singleCorse/:_id' , corseController.getSingleCorseFromDb)
Router.patch('/delete-Corse/:_id' , corseController.deleteCorse)
Router.patch('/update-corse/:_id' , corseController.updateCorse)
Router.put('/:CorseId/:assing_facalitis', corseController.assignCorseFacalitis)


export const CorseRouter=Router