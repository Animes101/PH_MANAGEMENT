"use strict";
// export const StudentRoutes=router;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_controlar_1 = require("./admin.controlar");
const validatonJoi_1 = __importDefault(require("../../utility/validatonJoi"));
const admin_validation_1 = require("./admin.validation");
// import { updateAdminValidationSchema } from './admin.validation';
// import validationRequest from '../../utility/validatonJoi';
const router = express_1.default.Router();
router.get('/get-allAdin', admin_controlar_1.adminController.getAllAdmin);
router.get('/single-admin/:_id', admin_controlar_1.adminController.getSingleAdmin);
router.patch('/deleteAdmin/:_id', admin_controlar_1.adminController.deleteAdmin);
router.patch('/updateAdmin/:_id', (0, validatonJoi_1.default)(admin_validation_1.updateAdminValidationSchema), admin_controlar_1.adminController.upadeAdmin);
exports.adminRouter = router;
