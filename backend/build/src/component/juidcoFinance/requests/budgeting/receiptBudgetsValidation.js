"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiRequestData = exports.requestData = exports.receiptBudgetsValidationWithID = exports.receiptBudgetsValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const receiptBudgetsSchema = joi_1.default.object({
    fin_year_id: joi_1.default.number().required(),
    primary_acc_code_id: joi_1.default.number().required(),
    amount: joi_1.default.number().required(),
});
exports.receiptBudgetsValidation = joi_1.default.array().items(receiptBudgetsSchema);
exports.receiptBudgetsValidationWithID = receiptBudgetsSchema.keys({
    id: joi_1.default.number().required(),
});
const requestData = (req) => {
    return {
        fin_year_id: req.body.fin_year_id,
        primary_acc_code_id: req.body.primary_acc_code_id,
        amount: req.body.amount,
    };
};
exports.requestData = requestData;
const multiRequestData = (req) => {
    const data = [];
    for (const item of req.body) {
        data.push({
            fin_year_id: item.fin_year_id,
            primary_acc_code_id: item.primary_acc_code_id,
            amount: item.amount,
        });
    }
    return data;
};
exports.multiRequestData = multiRequestData;
