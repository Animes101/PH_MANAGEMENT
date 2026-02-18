"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academinRouterDepartment = void 0;
const express_1 = __importDefault(require("express"));
const academinControlar_1 = require("./academinControlar");
const validatonJoi_1 = __importDefault(require("../../utility/validatonJoi"));
const academinDepartment_validatoin_1 = require("./academinDepartment.validatoin");
const router = express_1.default.Router();
router.post('/create-AcademinDepartment', (0, validatonJoi_1.default)(academinDepartment_validatoin_1.academinDepartmentValidaton), academinControlar_1.academinControlar.createAcademinDepartment);
router.get('/get-all-AcademinDepartment', academinControlar_1.academinControlar.ageAllAcademinDepartment);
router.get('/get-single-AcademinDepartment/:id', academinControlar_1.academinControlar.getSingleAcademinDepartment);
router.put('/update-AcademinDepartment/:id', academinControlar_1.academinControlar.updateAcademinDepartment);
exports.academinRouterDepartment = router;
