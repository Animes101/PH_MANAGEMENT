"use strict";
// export const StudentRoutes=router;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facalityRouter = void 0;
const express_1 = __importDefault(require("express"));
const facality_controller_1 = require("./facality.controller");
const validatonJoi_1 = __importDefault(require("../../utility/validatonJoi"));
const joi_validation_1 = require("./joi.validation");
const router = express_1.default.Router();
router.get('/get-allAdin', facality_controller_1.facalityController.getAllFacality);
router.get('/single-facality/:_id', facality_controller_1.facalityController.getSingleFacality);
router.patch('/facalityDelete/:_id', facality_controller_1.facalityController.deleteFacality);
router.patch('/updateFacality/:_id', (0, validatonJoi_1.default)(joi_validation_1.updateTeacherValidaion), facality_controller_1.facalityController.updateFacality);
exports.facalityRouter = router;
