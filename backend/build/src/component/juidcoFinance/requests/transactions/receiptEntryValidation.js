"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiRequestData = exports.requestData = exports.receiptValidationWithID = exports.receiptValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// Validating request data
const receiptSchema = joi_1.default.object({
    receipt_no: joi_1.default.string().required(),
    date: joi_1.default.string().required(),
    paid_by: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    module_id: joi_1.default.number().required(),
    receipt_type_id: joi_1.default.number().required(),
    mobile_no: joi_1.default.string().required(),
    admin_ward_id: joi_1.default.number().required(),
    narration: joi_1.default.string().required(),
    subledger_id: joi_1.default.number().required(),
    amount: joi_1.default.number().required()
});
exports.receiptValidation = joi_1.default.array().items(receiptSchema);
// Validating request data for update
exports.receiptValidationWithID = receiptSchema.keys({
    id: joi_1.default.number().required(),
});
// collect request data for update
const requestData = (req) => {
    return {
        receipt_no: req.body.receipt_no,
        date: req.body.date,
        paid_by: req.body.paid_by,
        email: req.body.email,
        module_id: req.body.module_id,
        receipt_type_id: req.body.receipt_type_id,
        mobile_no: req.body.mobile_no,
        admin_ward_id: req.body.admin_ward_id,
        narration: req.body.narration,
        subledger_id: req.body.subledger_id,
        amount: req.body.amount
    };
};
exports.requestData = requestData;
// collect request data for storing
const multiRequestData = (req) => {
    const data = [];
    for (const item of req.body) {
        data.push({
            receipt_no: item.receipt_no,
            date: item.date,
            paid_by: item.paid_by,
            email: item.email,
            module_id: item.module_id,
            receipt_type_id: item.receipt_type_id,
            mobile_no: item.mobile_no,
            admin_ward_id: item.admin_ward_id,
            narration: item.narration,
            subledger_id: item.subledger_id,
            amount: item.amount
        });
    }
    return data;
};
exports.multiRequestData = multiRequestData;
