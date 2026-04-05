"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../modules/user/user.model");
const SuperAdmin = {
    id: "Super-01",
    password: "superadmin",
    email: "superadmin@example.com",
    role: "superAdmin",
    status: "in-progress",
    isDelete: false,
};
const seedSuperAdmin = async () => {
    const isExist = await user_model_1.UserModel.findOne({ role: "superAdmin" });
    if (!isExist) {
        await user_model_1.UserModel.create(SuperAdmin);
    }
};
exports.default = seedSuperAdmin;
