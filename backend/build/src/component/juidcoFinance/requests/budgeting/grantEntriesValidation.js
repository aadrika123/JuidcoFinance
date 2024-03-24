"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiRequestData = exports.requestData = exports.grantEntriesValidationWithID = exports.grantEntriesValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const grantEntriesSchema = joi_1.default.object({
    ulb_id: joi_1.default.number().required(),
    primary_acc_code_id: joi_1.default.number().required(),
    grant_id: joi_1.default.number().required(),
    sanction_number: joi_1.default.string().required(),
    grant_nature_id: joi_1.default.number().required(),
    grant_from_date: joi_1.default.date().required(),
    grant_to_date: joi_1.default.date().required(),
    sanctioned_amount: joi_1.default.number().required(),
    advance_rcving_date: joi_1.default.date().required(),
    advance_amount: joi_1.default.number().required(),
    expenditure_date: joi_1.default.date().required(),
    voucher_id: joi_1.default.number().required(),
    expndtre_nature_id: joi_1.default.number().required(),
    blnce_trckng_id: joi_1.default.number().required(),
    refund_date: joi_1.default.date().required(),
    refund_amount: joi_1.default.number().required(),
    employee_id: joi_1.default.number().required(),
    signature: joi_1.default.string().required(),
});
exports.grantEntriesValidation = joi_1.default.array().items(grantEntriesSchema);
exports.grantEntriesValidationWithID = grantEntriesSchema.keys({
    id: joi_1.default.number().required(),
});
const requestData = (req) => {
    return {
        ulb_id: req.body.ulb_id,
        primary_acc_code_id: req.body.primary_acc_code_id,
        grant_id: req.body.grant_id,
        sanction_number: req.body.sanction_number,
        grant_nature_id: req.body.grant_nature_id,
        grant_from_date: req.body.grant_from_date,
        grant_to_date: req.body.grant_to_date,
        sanctioned_amount: req.body.sanctioned_amount,
        advance_rcving_date: req.body.advance_rcving_date,
        advance_amount: req.body.advance_amount,
        expenditure_date: req.body.expenditure_date,
        voucher_id: req.body.voucher_id,
        expndtre_nature_id: req.body.expndtre_nature_id,
        blnce_trckng_id: req.body.blnce_trckng_id,
        refund_date: req.body.refund_date,
        refund_amount: req.body.refund_amount,
        employee_id: req.body.employee_id,
        signature: req.body.signature,
    };
};
exports.requestData = requestData;
const multiRequestData = (req) => {
    const data = [];
    for (const item of req.body) {
        data.push({
            ulb_id: item.ulb_id,
            primary_acc_code_id: item.primary_acc_code_id,
            grant_id: item.grant_id,
            sanction_number: item.sanction_number,
            grant_nature_id: item.grant_nature_id,
            grant_from_date: item.grant_from_date,
            grant_to_date: item.grant_to_date,
            sanctioned_amount: item.sanctioned_amount,
            advance_rcving_date: item.advance_rcving_date,
            advance_amount: item.advance_amount,
            expenditure_date: item.expenditure_date,
            voucher_id: item.voucher_id,
            expndtre_nature_id: item.expndtre_nature_id,
            blnce_trckng_id: item.blnce_trckng_id,
            refund_date: item.refund_date,
            refund_amount: item.refund_amount,
            employee_id: item.employee_id,
            signature: item.signature,
        });
    }
    return data;
};
exports.multiRequestData = multiRequestData;
