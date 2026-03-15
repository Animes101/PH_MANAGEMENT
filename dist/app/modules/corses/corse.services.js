"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corseServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const { preRequisiteCorse, ...remainingData } = payload;
        // 1️⃣ update main course
        await corse_model_1.CorseModel.findByIdAndUpdate(_id, remainingData, { new: true, session });
        if (preRequisiteCorse && preRequisiteCorse.length > 0) {
            // 2️⃣ delete prerequisite
            const deletePreReq = preRequisiteCorse
                .filter((el) => el.isDelete)
                .map((el) => el.corse);
            if (deletePreReq.length > 0) {
                await corse_model_1.CorseModel.findByIdAndUpdate(_id, {
                    $pull: {
                        preRequisiteCorse: { corse: { $in: deletePreReq } },
                    },
                }, { session });
            }
            // 3️⃣ get updated course
            const course = await corse_model_1.CorseModel
                .findById(_id)
                .session(session);
            const existingIds = course?.preRequisiteCorse?.map((item) => item.corse.toString()) || [];
            // 4️⃣ add new prerequisite
            const newPreRequestCourse = preRequisiteCorse.filter((item) => !item.isDelete &&
                !existingIds.includes(item.corse.toString()));
            if (newPreRequestCourse.length > 0) {
                await corse_model_1.CorseModel.findByIdAndUpdate(_id, {
                    $addToSet: {
                        preRequisiteCorse: { $each: newPreRequestCourse },
                    },
                }, { new: true, session });
            }
        }
        const result = await corse_model_1.CorseModel
            .findById(_id)
            .session(session);
        await session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new AppError_1.default('Corse update Fail', 401);
    }
};
// assing facalitus
const assignFacalitsIntoDb = async (CorseId, payload) => {
    const result = await corse_model_1.CorseFacultiesModel.findOneAndUpdate({ corse: CorseId }, {
        $addToSet: {
            faculties: {
                $each: payload.faculties
            }
        }
    }, { upsert: true, new: true });
    return result;
};
exports.corseServices = {
    createCorseIntoDb,
    getAllCorsefromBd,
    getSingleCorseInotDb,
    deleteCorseFromDb,
    updateCorseFromDb,
    assignFacalitsIntoDb
};
