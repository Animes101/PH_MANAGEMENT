"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorseRouter = void 0;
const express_1 = __importDefault(require("express"));
const cors_contrller_1 = require("./cors.contrller");
const Router = express_1.default.Router();
Router.post('/create-corse', cors_contrller_1.corseController.createCorse);
exports.CorseRouter = Router;
