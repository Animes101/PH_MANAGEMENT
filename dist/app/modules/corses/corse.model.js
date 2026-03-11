"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorseModel = void 0;
const mongoose_1 = require("mongoose");
const preRequisitesSchema = new mongoose_1.Schema({
    corse: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});
const CorseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    prefix: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
    preRequisiteCorse: [preRequisitesSchema]
});
exports.CorseModel = (0, mongoose_1.model)('corse', CorseSchema);
