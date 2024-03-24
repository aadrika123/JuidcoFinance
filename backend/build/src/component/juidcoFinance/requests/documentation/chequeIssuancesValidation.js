"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiRequestData = exports.requestData = exports.chequeIssuancesValidationWithID = exports.chequeIssuancesValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const chequeIssuancesSchema = joi_1.default.object({
    voucher_no: joi_1.default.string().required(),
    voucher_date: joi_1.default.date().required(),
    bill_type_id: joi_1.default.number().required(),
    narration: joi_1.default.string().required(),
    admin_ward_id: joi_1.default.number().required(),
    payee_id: joi_1.default.number().required(),
    grant_id: joi_1.default.number().required(),
    bank_id: joi_1.default.number().required(),
    module_id: joi_1.default.number().required(),
    department_id: joi_1.default.number().required(),
    issue_date: joi_1.default.date().required(),
    cheque_no: joi_1.default.string().required(),
    amount: joi_1.default.number().required(),
});
exports.chequeIssuancesValidation = joi_1.default.array().items(chequeIssuancesSchema);
exports.chequeIssuancesValidationWithID = chequeIssuancesSchema.keys({
    id: joi_1.default.number().required(),
});
const requestData = (req) => {
    return {
        voucher_no: req.body.voucher_no,
        voucher_date: req.body.voucher_date,
        bill_type_id: req.body.bill_type_id,
        narration: req.body.narration,
        admin_ward_id: req.body.admin_ward_id,
        payee_id: req.body.payee_id,
        grant_id: req.body.grant_id,
        bank_id: req.body.bank_id,
        module_id: req.body.module_id,
        department_id: req.body.department_id,
        issue_date: req.body.issue_date,
        cheque_no: req.body.cheque_no,
        amount: req.body.amount,
    };
};
exports.requestData = requestData;
const multiRequestData = (req) => {
    const data = [];
    for (const item of req.body) {
        data.push({
            voucher_no: item.voucher_no,
            voucher_date: item.voucher_date,
            bill_type_id: item.bill_type_id,
            narration: item.narration,
            admin_ward_id: item.admin_ward_id,
            payee_id: item.payee_id,
            grant_id: item.grant_id,
            bank_id: item.bank_id,
            module_id: item.module_id,
            department_id: item.department_id,
            issue_date: item.issue_date,
            cheque_no: item.cheque_no,
            amount: item.amount,
        });
    }
    return data;
};
exports.multiRequestData = multiRequestData;
