"use strict";
// export const StudentRoutes=router;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_controlar_1 = require("./admin.controlar");
const router = express_1.default.Router();
router.get('/get-allAdin', admin_controlar_1.adminController.getAllAdmin);
router.get('/single-admin/:_id', admin_controlar_1.adminController.getSingleAdmin);
// router.delete('/deleteStudent/:id', studentController.deleteStudent);
// router.patch('/update/:id', validationRequest(updateStudentSchema), studentController.updateStudent);
exports.adminRouter = router;
