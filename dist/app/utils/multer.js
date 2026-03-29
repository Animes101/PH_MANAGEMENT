"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.sendImageToCludeNary = void 0;
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const AppError_1 = __importDefault(require("../errors/AppError"));
cloudinary_1.v2.config({
    cloud_name: 'doi78dfjf',
    api_key: '232271254725749',
    api_secret: '3nquADCWo0dmp-Q6Y4x6bbpUHMw' // Click 'View API Keys' above to copy your API secret
});
const sendImageToCludeNary = async (path, name) => {
    try {
        // 1️⃣ Upload to Cloudinary
        const uploadResult = await cloudinary_1.v2.uploader.upload(path, {
            public_id: name,
        });
        // 2️⃣ Local file delete
        fs_1.default.unlink(path, (err) => {
            if (err) {
                console.log("Local file delete error:", err);
            }
            else {
                console.log("Local file deleted:", path);
            }
        });
        return uploadResult;
    }
    catch (error) {
        // 3️⃣ Error হলে file delete করবো যাতে ফোল্ডার ভরে না যায়
        fs_1.default.unlink(path, () => { });
        throw new AppError_1.default("Cloudinary Error:", 402);
    }
};
exports.sendImageToCludeNary = sendImageToCludeNary;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
