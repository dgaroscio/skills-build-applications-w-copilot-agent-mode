"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.MONGO_URI = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DEFAULT_MONGO_URI = 'mongodb://127.0.0.1:27017/octofit_db';
exports.MONGO_URI = process.env.MONGODB_URI ?? DEFAULT_MONGO_URI;
const connectDatabase = async () => {
    if (mongoose_1.default.connection.readyState === 1) {
        return;
    }
    await mongoose_1.default.connect(exports.MONGO_URI);
};
exports.connectDatabase = connectDatabase;
