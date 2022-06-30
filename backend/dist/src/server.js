"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../config/db"));
const data_1 = require("../data/data");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("API is running");
});
app.get("/api/chat", (req, res) => {
    res.send(data_1.chats);
});
app.get("/api/chat/:id", (req, res) => {
    // console.log(req.params.id);
    const singleChat = data_1.chats.find((data) => data._id === req.params.id);
    res.send(singleChat);
});
const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
    console.log("server started on PORT", PORT);
});
