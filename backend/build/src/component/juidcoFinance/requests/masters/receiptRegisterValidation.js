"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOpeningBalanceSchema = exports.openingBalanceSchema = exports.receiptRegisterApproveSchema = exports.multiRequestData = exports.requestData = exports.receiptRegisterValidationWithID = exports.receiptRegisterValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const receiptRegisterSchema = joi_1.default.object({
    receipt_no: joi_1.default.string().required(),
    ulb_id: joi_1.default.number().required(),
    primary_acc_code_id: joi_1.default.number().required(),
    revenue_module_id: joi_1.default.number().required(),
    paid_by: joi_1.default.string().required(),
    receipt_mode_id: joi_1.default.number().required(),
    receipt_date: joi_1.default.date().required(),
    cheque_or_draft_no: joi_1.default.string(),
    bank_amount: joi_1.default.number(),
    cash_amount: joi_1.default.number(),
    bank_acc_no: joi_1.default.string(),
    deposit_date: joi_1.default.date(),
    realisation_date: joi_1.default.date(),
    wheather_returned: joi_1.default.boolean(),
    remarks: joi_1.default.string().required(),
    entered_by_id: joi_1.default.number().required(),
    entered_by_print_name: joi_1.default.string().required(),
    checked_by_id: joi_1.default.number(),
    checked_by_print_name: joi_1.default.string(),
});
exports.receiptRegisterValidation = joi_1.default.array().items(receiptRegisterSchema);
exports.receiptRegisterValidationWithID = receiptRegisterSchema.keys({
    id: joi_1.default.number().required(),
});
const requestData = (req) => {
    return {
        receipt_no: req.body.receipt_no,
        ulb_id: req.body.ulb_id,
        primary_acc_code_id: req.body.primary_acc_code_id,
        revenue_module_id: req.body.revenue_module_id,
        paid_by: req.body.paid_by,
        receipt_mode_id: req.body.receipt_mode_id,
        receipt_date: req.body.receipt_date,
        cheque_or_draft_no: req.body.cheque_or_draft_no,
        bank_amount: req.body.bank_amount,
        cash_amount: req.body.cash_amount,
        bank_acc_no: req.body.bank_acc_no,
        deposit_date: req.body.deposit_date,
        realisation_date: req.body.realisation_date,
        wheather_returned: req.body.wheather_returned,
        remarks: req.body.remarks,
        entered_by_id: req.body.entered_by_id,
        entered_by_print_name: req.body.entered_by_print_name,
        checked_by_id: req.body.checked_by_id,
        checked_by_print_name: req.body.checked_by_print_name,
    };
};
exports.requestData = requestData;
const multiRequestData = (req) => {
    const data = [];
    for (const item of req.body) {
        data.push({
            receipt_no: item.receipt_no,
            ulb_id: item.ulb_id,
            primary_acc_code_id: item.primary_acc_code_id,
            revenue_module_id: item.revenue_module_id,
            paid_by: item.paid_by,
            receipt_mode_id: item.receipt_mode_id,
            receipt_date: item.receipt_date,
            cheque_or_draft_no: item.cheque_or_draft_no,
            bank_amount: item.bank_amount,
            cash_amount: item.cash_amount,
            bank_acc_no: item.bank_acc_no,
            deposit_date: item.deposit_date,
            realisation_date: item.realisation_date,
            wheather_returned: item.wheather_returned,
            remarks: item.remarks,
            entered_by_id: item.entered_by_id,
            entered_by_print_name: item.entered_by_print_name,
            checked_by_id: item.checked_by_id,
            checked_by_print_name: item.checked_by_print_name,
        });
    }
    return data;
};
exports.multiRequestData = multiRequestData;
const receiptRegisterIdsSchema = joi_1.default.object({
    id: joi_1.default.number().required(),
});
exports.receiptRegisterApproveSchema = joi_1.default.object({
    checked_by_id: joi_1.default.number().required(),
    checked_by_print_name: joi_1.default.string().required(),
    ids: joi_1.default.array().required().items(receiptRegisterIdsSchema),
});
exports.openingBalanceSchema = joi_1.default.object({
    opening_balance: joi_1.default.number().required()
});
exports.updateOpeningBalanceSchema = joi_1.default.object({
    id: joi_1.default.number().required(),
    opening_balance: joi_1.default.number().required()
});
