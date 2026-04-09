import express from 'express'
import { corseController } from './cors.contrller'
import validationRequest from '../../utility/validatonJoi'
import { assignFacultiesValidation, createCourseValidationSchema } from './corse.validation.joi'
import auth from '../../../middlwares/auth'
import { User_Role } from '../user/user.constance'

const Router= express.Router()


Router.post('/create-corse', auth(User_Role.admin, User_Role.superAdmin), validationRequest(createCourseValidationSchema), corseController.createCorse)
Router.get('/get-allCorse', auth(User_Role.admin, User_Role.superAdmin),  corseController.getAllCorse);
Router.get('/get-singleCorse/:_id' , auth(User_Role.admin, User_Role.superAdmin), corseController.getSingleCorseFromDb)
Router.patch('/delete-Corse/:_id' , auth(User_Role.admin, User_Role.superAdmin), corseController.deleteCorse)
Router.patch('/update-corse/:_id' , auth(User_Role.admin, User_Role.superAdmin), corseController.updateCorse)
Router.put('/:CorseId/:assing_facalitis',auth(User_Role.admin, User_Role.superAdmin),  validationRequest(assignFacultiesValidation), corseController.assignCorseFacalitis)
Router.get('/getCorseFacality/:CorseId', auth(User_Role.admin, User_Role.superAdmin, User_Role.student),  corseController.getCorseFacalitis)

Router.delete('/:CorseId/:deleteCorseFacalitis', auth(User_Role.admin, User_Role.superAdmin),  validationRequest(assignFacultiesValidation), corseController.deleteFacalitisCorse)



export const CorseRouter=Router