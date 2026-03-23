"use strict";
// import config from "../app/config"
// import  Jwt  from "jsonwebtoken";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const createToken=(jwtPayload)=>{
//    const token= Jwt.sign(jwtPayload, config.JWT_ACCESS_TOKEN as string, { expiresIn: `${config.token_txpire}` })
//    return token
// }
// export default createToken;
const config_1 = __importDefault(require("../app/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (jwtPayload) => {
    const options = {
        expiresIn: config_1.default.token_txpire // number or string is fine
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.JWT_ACCESS_TOKEN, options);
    return token;
};
exports.default = createToken;
