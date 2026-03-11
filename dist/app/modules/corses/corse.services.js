"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corseServices = void 0;
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
exports.corseServices = {
    createCorseIntoDb,
    getAllCorsefromBd,
    getSingleCorseInotDb
};
