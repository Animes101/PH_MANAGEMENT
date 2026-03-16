"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterColtroller = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const respons_1 = __importDefault(require("../../utility/respons"));
const Register_services_1 = require("./Register.services");
const createRegister = (0, catchAsync_1.default)(async (req, res) => {
    const result = await Register_services_1.RegisterServices.createRegisterIntoBd(req.body);
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Register Corse success fully',
        data: result,
    });
});
exports.RegisterColtroller = {
    createRegister,
};
