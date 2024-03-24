"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiRequestData = exports.requestData = exports.budgetAppropriationsValidationWithID = exports.budgetAppropriationsValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const budgetAppropriationsSchema = joi_1.default.object({
    fin_year_id: joi_1.default.number().required(),
    primary_acc_code_id: joi_1.default.number().required(),
    remark: joi_1.default.string().required(),
    from_primary_acc_code_id: joi_1.default.number().required(),
    approved_amount: joi_1.default.number().required(),
    transfer_amount: joi_1.default.number().required(),
});
exports.budgetAppropriationsValidation = joi_1.default.array().items(budgetAppropriationsSchema);
exports.budgetAppropriationsValidationWithID = budgetAppropriationsSchema.keys({
    id: joi_1.default.number().required(),
});
const requestData = (req) => {
    return {
        fin_year_id: req.body.fin_year_id,
        primary_acc_code_id: req.body.primary_acc_code_id,
        remark: req.body.remark,
        from_primary_acc_code_id: req.body.from_primary_acc_code_id,
        approved_amount: req.body.approved_amount,
        transfer_amount: req.body.transfer_amount,
    };
};
exports.requestData = requestData;
const multiRequestData = (req) => {
    const data = [];
    for (const item of req.body) {
        data.push({
            fin_year_id: item.fin_year_id,
            primary_acc_code_id: item.primary_acc_code_id,
            remark: item.remark,
            from_primary_acc_code_id: item.from_primary_acc_code_id,
            approved_amount: item.approved_amount,
            transfer_amount: item.transfer_amount,
        });
    }
    return data;
};
exports.multiRequestData = multiRequestData;
