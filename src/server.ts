import mongoose from "mongoose";
import app from "./app";
import config from "./app/config/index.js";
import { Server } from "node:http";

const PORT = config.port;
const uri: string = config.mongoURI;

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected");

    // ✅ MUST assign server
    server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
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
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception! Shutting down...");
  console.log(err);
  process.exit(1);
});

bootstrap();






