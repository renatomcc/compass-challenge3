"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./server"));
const dotenv_1 = __importDefault(require("dotenv"));
const Routes_1 = __importDefault(require("./routes/Routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', Routes_1.default);
(0, server_1.default)();
exports.default = app;
