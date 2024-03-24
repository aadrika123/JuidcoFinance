"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestNewAccCodeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.requestNewAccCodeSchema = joi_1.default.object({
    id: joi_1.default.number(),
    ulb_id: joi_1.default.number().required(),
    request_no: joi_1.default.string().required(),
    employee_id: joi_1.default.number().required(),
    date: joi_1.default.date().iso().required(),
    group_ref: joi_1.default.string().required(),
    code_ref: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
});
