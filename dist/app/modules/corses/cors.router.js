"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorseRouter = void 0;
const express_1 = __importDefault(require("express"));
const cors_contrller_1 = require("./cors.contrller");
const validatonJoi_1 = __importDefault(require("../../utility/validatonJoi"));
const corse_validation_joi_1 = require("./corse.validation.joi");
const Router = express_1.default.Router();
Router.post('/create-corse', (0, validatonJoi_1.default)(corse_validation_joi_1.createCourseValidationSchema), cors_contrller_1.corseController.createCorse);
Router.get('/get-allCorse', cors_contrller_1.corseController.getAllCorse);
Router.get('/get-singleCorse/:_id', cors_contrller_1.corseController.getSingleCorseFromDb);
Router.patch('/delete-Corse/:_id', cors_contrller_1.corseController.deleteCorse);
Router.patch('/update-corse/:_id', cors_contrller_1.corseController.updateCorse);
exports.CorseRouter = Router;
