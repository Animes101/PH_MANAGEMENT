"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corseServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const queryBuilder_1 = __importDefault(require("../../queryBuilder/queryBuilder"));
const corse_model_1 = require("./corse.model");
const createCorseIntoDb = async (payload) => {
    const result = await corse_model_1.CorseModel.create(payload);
    return result;
};
const getAllCorsefromBd = async (query) => {
    const queryBuilder = new queryBuilder_1.default(corse_model_1.CorseModel.find(), query);
    const corses = await queryBuilder
        .search(['title'])
        .filter()
        .sort()
        .pagination()
        .fields()
        .modelQuery;
    return corses;
};
const getSingleCorseInotDb = async (_id) => {
    const result = await corse_model_1.CorseModel.findOne({ _id });
    return result;
};
const deleteCorseFromDb = async (_id) => {
    // 1️⃣ find student by custom id
    const corse = await corse_model_1.CorseModel.findOne({ _id });
    if (!corse) {
        throw new AppError_1.default("Corse  not found", 404);
    }
    const result = await corse_model_1.CorseModel.findOneAndUpdate({ _id }, { isDelete: true }, { new: true });
    return result;
};
const updateCorseFromDb = async (_id, payload) => {
    const { preRequisiteCorse, ...remainingData } = payload;
    // 1️⃣ update basic data
    const updatedCourse = await corse_model_1.CorseModel.findByIdAndUpdate(_id, remainingData, { new: true });
    // 2️⃣ delete prerequisite course
    if (preRequisiteCorse && preRequisiteCorse.length > 0) {
        const deletePreReq = preRequisiteCorse
            .filter((el) => el.isDelete === true)
            .map((el) => el.corse);
        if (deletePreReq.length > 0) {
            await corse_model_1.CorseModel.findByIdAndUpdate(_id, {
                $pull: {
                    preRequisiteCorse: { corse: { $in: deletePreReq } },
                },
            });
        }
    }
    return updatedCourse;
};
exports.corseServices = {
    createCorseIntoDb,
    getAllCorsefromBd,
    getSingleCorseInotDb,
    deleteCorseFromDb,
    updateCorseFromDb
};
