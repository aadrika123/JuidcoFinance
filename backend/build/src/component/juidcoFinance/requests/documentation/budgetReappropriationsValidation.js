"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiRequestData = exports.requestData = exports.budgetReappropriationsValidationWithID = exports.budgetReappropriationsValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const budgetReappropriationsSchema = joi_1.default.object({
    fin_year_id: joi_1.default.number().required(),
    primary_acc_code_id: joi_1.default.number().required(),
    transaction_date: joi_1.default.date().required(),
    budget_name_id: joi_1.default.number().required(),
    actual_amount: joi_1.default.number().required(),
    from_primary_acc_code_id: joi_1.default.number().required(),
    approved_amount: joi_1.default.number().required(),
    balance_amount: joi_1.default.number().required(),
    transfer_amount: joi_1.default.number().required(),
    remark: joi_1.default.string().required(),
});
exports.budgetReappropriationsValidation = joi_1.default.array().items(budgetReappropriationsSchema);
exports.budgetReappropriationsValidationWithID = budgetReappropriationsSchema.keys({
    id: joi_1.default.number().required(),
});
const requestData = (req) => {
    return {
        fin_year_id: req.body.fin_year_id,
        primary_acc_code_id: req.body.primary_acc_code_id,
        transaction_date: req.body.transaction_date,
        budget_name_id: req.body.budget_name_id,
        actual_amount: req.body.actual_amount,
        from_primary_acc_code_id: req.body.from_primary_acc_code_id,
        approved_amount: req.body.approved_amount,
        balance_amount: req.body.balance_amount,
        transfer_amount: req.body.transfer_amount,
        remark: req.body.remark,
    };
};
exports.requestData = requestData;
const multiRequestData = (req) => {
    const data = [];
    for (const item of req.body) {
        data.push({
            fin_year_id: item.fin_year_id,
            primary_acc_code_id: item.primary_acc_code_id,
            transaction_date: item.transaction_date,
            budget_name_id: item.budget_name_id,
            actual_amount: item.actual_amount,
            from_primary_acc_code_id: item.from_primary_acc_code_id,
            approved_amount: item.approved_amount,
            balance_amount: item.balance_amount,
            transfer_amount: item.transfer_amount,
            remark: item.remark,
        });
    }
    return data;
};
exports.multiRequestData = multiRequestData;
