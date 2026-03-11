import express from 'express'
import { corseController } from './cors.contrller'

const Router= express.Router()


Router.post('/create-corse', corseController.createCorse)

export const CorseRouter=Router