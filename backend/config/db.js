"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.MongoURI);
        console.log(`MongoDB conneted: ${conn.connection.host}`);
    }
    catch (e) {
        console.log(`Error: ${e.message}`);
        process.exit();
    }
};
// module.exports = connectDB;
exports.default = connectDB;
