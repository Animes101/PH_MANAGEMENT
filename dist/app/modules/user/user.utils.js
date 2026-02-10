"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatedId = void 0;
const generatedId = (payload) => {
    const year = payload.year;
    const code = payload.code;
    const currentId = 0;
    const incrementedId = (currentId + 1)
        .toString()
        .padStart(6, '0');
    const generatedId = `${year}${code}${incrementedId}`;
    return generatedId;
};
exports.generatedId = generatedId;
