"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chequebookRequestData = exports.chequebookValidationAlongWithID = exports.chequebookValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.chequebookValidation = joi_1.default.object({
    date: joi_1.default.date().iso().required(),
    issuer_name: joi_1.default.string().required(),
    bank_name: joi_1.default.string().required(),
    bank_account_no: joi_1.default.string().required(),
    cheque_no_from: joi_1.default.string().required(),
    employee_id: joi_1.default.number().required(),
    bank_branch: joi_1.default.string().required(),
    page_count: joi_1.default.number().required(),
    cheque_no_to: joi_1.default.string().required(),
});
exports.chequebookValidationAlongWithID = exports.chequebookValidation.keys({
    id: joi_1.default.number().required()
});
// arrange request data for store and update
const chequebookRequestData = (req) => {
    return {
        date: req.body.date,
        issuer_name: req.body.issuer_name,
        bank_name: req.body.bank_name,
        bank_account_no: req.body.bank_account_no,
        cheque_no_from: req.body.cheque_no_from,
        employee_id: req.body.employee_id,
        bank_branch: req.body.bank_branch,
        page_count: req.body.page_count,
        cheque_no_to: req.body.cheque_no_to,
        cheque_book_return: false,
        cheque_book_return_date: new Date(),
    };
};
exports.chequebookRequestData = chequebookRequestData;
