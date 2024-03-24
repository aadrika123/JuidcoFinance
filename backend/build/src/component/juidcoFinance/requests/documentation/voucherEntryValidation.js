"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiRequestData = exports.requestData = exports.voucherEntryValidationWithID = exports.voucherEntryValidation = exports.voucherEntrySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const generateUniqueNo_1 = require("../../../../util/helper/generateUniqueNo");
// Validating request data
exports.voucherEntrySchema = joi_1.default.object({
    voucher_date: joi_1.default.string().required(),
    voucher_type_id: joi_1.default.number().required(),
    narration: joi_1.default.string().required(),
    department_id: joi_1.default.number().required(),
    adminis_ward_id: joi_1.default.number().required(),
    voucher_sub_id: joi_1.default.number().required(),
    sub_ledger_id: joi_1.default.number().required(),
    amount: joi_1.default.number().required(),
    dr_cr_id: joi_1.default.number().required(),
});
exports.voucherEntryValidation = joi_1.default.array().items(exports.voucherEntrySchema);
// Validating request data for update
exports.voucherEntryValidationWithID = exports.voucherEntrySchema.keys({
    id: joi_1.default.number().required(),
});
// arrange request data for store and update
const requestData = (req) => {
    return {
        voucher_no: req.body.voucher_no,
        voucher_date: req.body.voucher_date,
        voucher_type_id: req.body.voucher_type_id,
        narration: req.body.narration,
        department_id: req.body.department_id,
        adminis_ward_id: req.body.adminis_ward_id,
        voucher_sub_id: req.body.voucher_sub_id,
        sub_ledger_id: req.body.sub_ledger_id,
        amount: req.body.amount,
        dr_cr_id: req.body.dr_cr_id,
    };
};
exports.requestData = requestData;
// arrange request data for store
const multiRequestData = (req) => {
    const data = [];
    for (const item of req.body) {
        data.push({
            voucher_no: (0, generateUniqueNo_1.generateUniquePaymentNo)("VN"),
            voucher_date: item.voucher_date,
            voucher_type_id: item.voucher_type_id,
            narration: item.narration,
            department_id: item.department_id,
            adminis_ward_id: item.adminis_ward_id,
            voucher_sub_id: item.voucher_sub_id,
            sub_ledger_id: item.sub_ledger_id,
            amount: item.amount,
            dr_cr_id: item.dr_cr_id,
        });
    }
    return data;
};
exports.multiRequestData = multiRequestData;
