"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRouter = void 0;
const express_1 = __importDefault(require("express"));
const validatonJoi_1 = __importDefault(require("../../utility/validatonJoi"));
const Registation_validation_1 = require("./Registation.validation");
const Register_controller_1 = require("./Register.controller");
const Router = express_1.default.Router();
Router.post('/create-register', (0, validatonJoi_1.default)(Registation_validation_1.createRegistrationValidation), Register_controller_1.RegisterColtroller.createRegister);
// Router.get('/get-allCorse', corseController.getAllCorse);
// Router.get('/get-singleCorse/:_id' , corseController.getSingleCorseFromDb)
// Router.patch('/delete-Corse/:_id' , corseController.deleteCorse)
// Router.patch('/update-corse/:_id' , corseController.updateCorse)
// Router.put('/:CorseId/:assing_facalitis', validationRequest(assignFacultiesValidation), corseController.assignCorseFacalitis)
// Router.delete('/:CorseId/:deleteCorseFacalitis', validationRequest(assignFacultiesValidation), corseController.deleteFacalitisCorse)
exports.RegisterRouter = Router;
