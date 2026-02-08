"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterRoute = void 0;
const express_1 = __importDefault(require("express"));
const seminter_controlar_1 = require("./seminter.controlar");
const validatonJoi_1 = __importDefault(require("../../utility/validatonJoi"));
const semister_validaton_1 = require("./semister.validaton");
const router = express_1.default.Router();
router.post('/create-sementer', (0, validatonJoi_1.default)(semister_validaton_1.academicSemesterValidationSchem), seminter_controlar_1.academinSemesterController.createAcademicSemester);
exports.academicSemesterRoute = router;
