"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiRequestData = exports.requestData = exports.billInvoicesValidationWithID = exports.billInvoicesValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// Validating request data
const billInvoicesSchema = joi_1.default.object({
    bill_no: joi_1.default.string().required(),
    type_id: joi_1.default.number().required(),
    vendor_id: joi_1.default.number().required(),
    department_id: joi_1.default.number().required(),
    bill_date: joi_1.default.date().required(),
    entry_date: joi_1.default.date().required(),
    stage_id: joi_1.default.number().required(),
    address: joi_1.default.string().required(),
    narration: joi_1.default.string().required(),
    admin_ward_id: joi_1.default.number().required(),
    amount: joi_1.default.number().required()
});
exports.billInvoicesValidation = joi_1.default.array().items(billInvoicesSchema);
// Validating request data for update
exports.billInvoicesValidationWithID = billInvoicesSchema.keys({
    id: joi_1.default.number().required(),
});
// collect request data for update
const requestData = (req) => {
    return {
        bill_no: req.body.bill_no,
        type_id: req.body.type_id,
        vendor_id: req.body.vendor_id,
        department_id: req.body.department_id,
        bill_date: req.body.bill_date,
        entry_date: req.body.entry_date,
        stage_id: req.body.stage_id,
        address: req.body.address,
        narration: req.body.narration,
        admin_ward_id: req.body.admin_ward_id,
        amount: req.body.amount
    };
};
exports.requestData = requestData;
// collect request data for storing
const multiRequestData = (req) => {
    const data = [];
    for (const item of req.body) {
        data.push({
            bill_no: item.bill_no,
            type_id: item.type_id,
            vendor_id: item.vendor_id,
            department_id: item.department_id,
            bill_date: item.bill_date,
            entry_date: item.entry_date,
            stage_id: item.stage_id,
            address: item.address,
            narration: item.narration,
            admin_ward_id: item.admin_ward_id,
            amount: item.amount
        });
    }
    return data;
};
exports.multiRequestData = multiRequestData;
