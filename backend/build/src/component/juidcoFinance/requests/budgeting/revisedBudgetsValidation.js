"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiRequestData = exports.requestData = exports.revisedBudgetsValidationWithID = exports.revisedBudgetsValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const revisedBudgetsSchema = joi_1.default.object({
    primary_acc_code_id: joi_1.default.number().required(),
    approved_amount: joi_1.default.number().required(),
    revised_amount: joi_1.default.number().required(),
    remarks: joi_1.default.string().required(),
});
exports.revisedBudgetsValidation = joi_1.default.array().items(revisedBudgetsSchema);
exports.revisedBudgetsValidationWithID = revisedBudgetsSchema.keys({
    id: joi_1.default.number().required(),
});
const requestData = (req) => {
    return {
        primary_acc_code_id: req.body.primary_acc_code_id,
        approved_amount: req.body.approved_amount,
        revised_amount: req.body.revised_amount,
        remarks: req.body.remarks,
    };
};
exports.requestData = requestData;
const multiRequestData = (req) => {
    const data = [];
    for (const item of req.body) {
        data.push({
            primary_acc_code_id: item.primary_acc_code_id,
            approved_amount: item.approved_amount,
            revised_amount: item.revised_amount,
            remarks: item.remarks,
        });
    }
    return data;
};
exports.multiRequestData = multiRequestData;
