"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestData = exports.dirPaymentEntryValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// Validating request data
exports.dirPaymentEntryValidation = joi_1.default.object({
    id: joi_1.default.number(),
    payment_date: joi_1.default.date().required(),
    payment_type_id: joi_1.default.number().required(),
    payee_name: joi_1.default.string().required(),
    narration: joi_1.default.string().required(),
    grant_id: joi_1.default.number().required(),
    user_common_budget: joi_1.default.boolean().required(),
    adminis_ward_id: joi_1.default.number().required(),
    address: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    department_id: joi_1.default.number().required(),
    payment_mode: joi_1.default.string().required(),
    amount: joi_1.default.number().required(),
});
// arrange request data for store and update
const requestData = (req) => {
    return {
        payment_date: req.body.payment_date,
        payment_no: req.body.payment_no,
        payment_type_id: req.body.payment_type_id,
        payee_name: req.body.payee_name,
        narration: req.body.narration,
        grant_id: req.body.grant_id,
        user_common_budget: req.body.user_common_budget,
        adminis_ward_id: req.body.adminis_ward_id,
        address: req.body.address,
        department_id: req.body.department_id,
        email: req.body.email,
        payment_mode: req.body.payment_mode,
        amount: req.body.amount,
    };
};
exports.requestData = requestData;
