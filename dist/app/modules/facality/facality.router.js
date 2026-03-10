"use strict";
// export const StudentRoutes=router;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facalityRouter = void 0;
const express_1 = __importDefault(require("express"));
const facality_controller_1 = require("./facality.controller");
const router = express_1.default.Router();
router.get('/get-allAdin', facality_controller_1.facalityController.getAllFacality);
router.get('/single-facality/:_id', facality_controller_1.facalityController.getSingleFacality);
// router.patch('/deleteAdmin/:_id', adminController.deleteAdmin);
// router.patch('/update/:_id',  adminController.upadeAdmin);
exports.facalityRouter = router;
