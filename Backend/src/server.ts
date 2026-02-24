import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { config } from "./config";
import { registerRoutes } from "./Routes/index"

dotenv.config();

const app = express();
const PORT = config.server.port || 8080;

app.use(cors());
app.use(express.json()); 


(async function startUp() {
  try {
    await mongoose.connect(config.mongo.url, {
      w: "majority",
      retryWrites: true,
      authMechanism: "DEFAULT",
    });
    console.log("✅ Database connected successfully");

    registerRoutes(app);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Could not connect to database:", err);
  }
})();
