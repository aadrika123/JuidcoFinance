"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiRequestData = exports.requestData = exports.billPaymentEntryValidationAlongWithID = exports.billPaymentEntryValidation = exports.billPaymentEntrySchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Validating request data
exports.billPaymentEntrySchema = joi_1.default.object({
    bill_no: joi_1.default.string().required(),
    bill_type_id: joi_1.default.number().required(),
    bill_entry_date: joi_1.default.date().required(),
    department_id: joi_1.default.number().required(),
    vendor_id: joi_1.default.number().required(),
    address: joi_1.default.string().required(),
    payee_id: joi_1.default.number().required(),
    adminis_ward_id: joi_1.default.number().required(),
    bill_amount: joi_1.default.number().required(),
    advance: joi_1.default.number().required(),
    deposit: joi_1.default.number().required(),
    deductions_amount: joi_1.default.number().required(),
});
exports.billPaymentEntryValidation = joi_1.default.array().items(exports.billPaymentEntrySchema);
// Validating request data for update
exports.billPaymentEntryValidationAlongWithID = exports.billPaymentEntrySchema.keys({
    id: joi_1.default.number().required(),
});
// arrange request data for update
const requestData = (req) => {
    return {
        bill_no: req.body.bill_no,
        bill_type_id: req.body.bill_type_id,
        bill_entry_date: req.body.bill_entry_date,
        department_id: req.body.department_id,
        vendor_id: req.body.vendor_id,
        address: req.body.address,
        payee_id: req.body.payee_id,
        adminis_ward_id: req.body.adminis_ward_id,
        bill_amount: req.body.bill_amount,
        advance: req.body.advance,
        deposit: req.body.deposit,
        deductions_amount: req.body.deductions_amount,
    };
};
exports.requestData = requestData;
// arrange request data for store
const multiRequestData = (req) => {
    const data = [];
    for (const item of req.body) {
        data.push({
            bill_no: item.bill_no,
            bill_type_id: item.bill_type_id,
            bill_entry_date: item.bill_entry_date,
            department_id: item.department_id,
            vendor_id: item.vendor_id,
            address: item.address,
            payee_id: item.payee_id,
            adminis_ward_id: item.adminis_ward_id,
            bill_amount: item.bill_amount,
            advance: item.advance,
            deposit: item.deposit,
            deductions_amount: item.deductions_amount
        });
    }
    return data;
};
exports.multiRequestData = multiRequestData;
