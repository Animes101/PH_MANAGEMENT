"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const index_js_1 = __importDefault(require("./app/config/index.js"));
const PORT = index_js_1.default.port;
const uri = index_js_1.default.mongoURI;
let server;
async function bootstrap() {
    try {
        await mongoose_1.default.connect(uri);
        console.log("✅ MongoDB Connected");
        // ✅ MUST assign server
        server = app_1.default.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Server Error", error);
    }
}
process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection! Server shutting down...");
    console.log(err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception! Shutting down...");
    console.log(err);
    process.exit(1);
});
bootstrap();
