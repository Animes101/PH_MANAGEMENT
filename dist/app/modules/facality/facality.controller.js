"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facalityController = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const respons_1 = __importDefault(require("../../utility/respons"));
const facality_services_1 = require("./facality.services");
const getAllFacality = (0, catchAsync_1.default)(async (req, res) => {
    const result = facality_services_1.facalityServices.getAllFacality(req.query);
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'aget all falaclty successfully',
        data: result,
    });
});
const getSingleFacality = (0, catchAsync_1.default)(async (req, res) => {
    const _id = req.params._id;
    const result = await facality_services_1.facalityServices.getSingleFacality({ _id });
    (0, respons_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'aget all falaclty successfully',
        data: result,
    });
});
exports.facalityController = {
    getAllFacality,
    getSingleFacality
};
