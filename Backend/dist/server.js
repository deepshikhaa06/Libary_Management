"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config");
const index_1 = require("./Routes/index");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = config_1.config.server.port || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(async function startUp() {
    try {
        await mongoose_1.default.connect(config_1.config.mongo.url, {
            w: "majority",
            retryWrites: true,
            authMechanism: "DEFAULT",
        });
        console.log("✅ Database connected successfully");
        (0, index_1.registerRoutes)(app);
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error("❌ Could not connect to database:", err);
    }
})();
