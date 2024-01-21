"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./component/juidcoFinance/router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
/// JUIDCO_FINANCE ///
new router_1.default(app);
exports.default = app;
