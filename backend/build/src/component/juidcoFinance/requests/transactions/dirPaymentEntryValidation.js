"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiRequestData = exports.requestData = exports.dirPaymentEntryValidationAlongWithID = exports.dirPaymentEntryValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const generateUniqueNo_1 = require("../../../../util/helper/generateUniqueNo");
// Validating request data
const dirPaymentEntrySchema = joi_1.default.object({
    payment_date: joi_1.default.date().required(),
    payment_type_id: joi_1.default.number().required(),
    payee_name_id: joi_1.default.number().required(),
    narration: joi_1.default.string().required(),
    grant_id: joi_1.default.number().required(),
    user_common_budget: joi_1.default.boolean().required(),
    adminis_ward_id: joi_1.default.number().required(),
    address: joi_1.default.string().required(),
    department_id: joi_1.default.number().required(),
    payment_mode: joi_1.default.string().required(),
    subledger_id: joi_1.default.number().required(),
    amount: joi_1.default.number().required(),
});
exports.dirPaymentEntryValidation = joi_1.default.array().items(dirPaymentEntrySchema);
// Validating request data for update
exports.dirPaymentEntryValidationAlongWithID = dirPaymentEntrySchema.keys({
    id: joi_1.default.number().required(),
});
// arrange request data for update
const requestData = (req) => {
    return {
        payment_date: req.body.payment_date,
        payment_no: req.body.payment_no,
        payment_type_id: req.body.payment_type_id,
        payee_name_id: req.body.payee_name_id,
        narration: req.body.narration,
        grant_id: req.body.grant_id,
        user_common_budget: req.body.user_common_budget,
        adminis_ward_id: req.body.adminis_ward_id,
        address: req.body.address,
        department_id: req.body.department_id,
        payment_mode: req.body.payment_mode,
        subledger_id: req.body.subledger_id,
        amount: req.body.amount,
    };
};
exports.requestData = requestData;
// arrange request data for store
const multiRequestData = (req) => {
    const data = [];
    for (const item of req.body) {
        data.push({
            payment_date: item.payment_date,
            payment_no: (0, generateUniqueNo_1.generateUniquePaymentNo)("pn"),
            payment_type_id: item.payment_type_id,
            payee_name_id: item.payee_name_id,
            narration: item.narration,
            grant_id: item.grant_id,
            user_common_budget: item.user_common_budget,
            adminis_ward_id: item.adminis_ward_id,
            address: item.address,
            department_id: item.department_id,
            payment_mode: item.payment_mode,
            subledger_id: item.subledger_id,
            amount: item.amount,
        });
    }
    return data;
};
exports.multiRequestData = multiRequestData;
