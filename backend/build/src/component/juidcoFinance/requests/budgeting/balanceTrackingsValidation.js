"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiRequestData = exports.requestData = exports.balanceTrackingsValidationWithID = exports.balanceTrackingsValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const balanceTrackingsSchema = joi_1.default.object({
    primary_acc_code_id: joi_1.default.number().required(),
    balance_amount: joi_1.default.number().required(),
    debit_balance: joi_1.default.number().required(),
    credit_balance: joi_1.default.number().required(),
});
exports.balanceTrackingsValidation = joi_1.default.array().items(balanceTrackingsSchema);
exports.balanceTrackingsValidationWithID = balanceTrackingsSchema.keys({
    id: joi_1.default.number().required(),
});
const requestData = (req) => {
    return {
        primary_acc_code_id: req.body.primary_acc_code_id,
        total_balance: req.body.balance_amount,
        debit_balance: req.body.debit_balance,
        credit_balance: req.body.credit_balance
    };
};
exports.requestData = requestData;
const multiRequestData = (req) => {
    const data = [];
    for (const item of req.body) {
        data.push({
            primary_acc_code_id: item.primary_acc_code_id,
            total_balance: item.balance_amount,
            debit_balance: item.debit_balance,
            credit_balance: item.credit_balance
        });
    }
    return data;
};
exports.multiRequestData = multiRequestData;
