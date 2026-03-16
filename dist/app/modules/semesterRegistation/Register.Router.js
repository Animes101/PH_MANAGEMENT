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
Router.get('/get-allRegister', Register_controller_1.RegisterColtroller.getAllReginster);
Router.get('/get-getSingleRegistrer/:_id', Register_controller_1.RegisterColtroller.getSingleRegister);
Router.patch('/delete-Register/:_id', Register_controller_1.RegisterColtroller.deleteRegister);
Router.patch('/update-Register/:_id', Register_controller_1.RegisterColtroller.upadeRegister);
exports.RegisterRouter = Router;
