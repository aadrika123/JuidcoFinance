"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiRequestData = exports.requestData = exports.investmentsValidationWithID = exports.investmentsValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const investmentsSchema = joi_1.default.object({
    ulb_id: joi_1.default.number().required(),
    primary_acc_code_id: joi_1.default.number().required(),
    investment_no: joi_1.default.string().required(),
    authorization_date: joi_1.default.date().required(),
    investment_date: joi_1.default.date().required(),
    particulars: joi_1.default.string().required(),
    investment_type_id: joi_1.default.number().required(),
    purchase_amount: joi_1.default.number().required(),
    face_value_amount: joi_1.default.number().required(),
    interest_due_date: joi_1.default.date().required(),
    interest_due_amount: joi_1.default.number().required(),
    employee_id: joi_1.default.number().required(),
    interest_recovered_amount: joi_1.default.number().required(),
    interest_recovery_date: joi_1.default.date().required(),
    acc_adj_recovery_date: joi_1.default.date().required(),
    realization_final_amount: joi_1.default.number().required(),
    realization_date: joi_1.default.date().required(),
    acc_adj_realization_date: joi_1.default.date().required(),
    remarks: joi_1.default.string().required(),
});
exports.investmentsValidation = joi_1.default.array().items(investmentsSchema);
exports.investmentsValidationWithID = investmentsSchema.keys({
    id: joi_1.default.number().required(),
});
const requestData = (req) => {
    return {
        ulb_id: req.body.ulb_id,
        primary_acc_code_id: req.body.primary_acc_code_id,
        investment_no: req.body.investment_no,
        authorization_date: req.body.authorization_date,
        investment_date: req.body.investment_date,
        particulars: req.body.particulars,
        investment_type_id: req.body.investment_type_id,
        purchase_amount: req.body.purchase_amount,
        face_value_amount: req.body.face_value_amount,
        interest_due_date: req.body.interest_due_date,
        interest_due_amount: req.body.interest_due_amount,
        employee_id: req.body.employee_id,
        interest_recovered_amount: req.body.interest_recovered_amount,
        interest_recovery_date: req.body.interest_recovery_date,
        acc_adj_recovery_date: req.body.acc_adj_recovery_date,
        realization_final_amount: req.body.realization_final_amount,
        realization_date: req.body.realization_date,
        acc_adj_realization_date: req.body.acc_adj_realization_date,
        remarks: req.body.remarks,
    };
};
exports.requestData = requestData;
const multiRequestData = (req) => {
    const data = [];
    for (const item of req.body) {
        data.push({
            ulb_id: item.ulb_id,
            primary_acc_code_id: item.primary_acc_code_id,
            investment_no: item.investment_no,
            authorization_date: item.authorization_date,
            investment_date: item.investment_date,
            particulars: item.particulars,
            investment_type_id: item.investment_type_id,
            purchase_amount: item.purchase_amount,
            face_value_amount: item.face_value_amount,
            interest_due_date: item.interest_due_date,
            interest_due_amount: item.interest_due_amount,
            employee_id: item.employee_id,
            interest_recovered_amount: item.interest_recovered_amount,
            interest_recovery_date: item.interest_recovery_date,
            acc_adj_recovery_date: item.acc_adj_recovery_date,
            realization_final_amount: item.realization_final_amount,
            realization_date: item.realization_date,
            acc_adj_realization_date: item.acc_adj_realization_date,
            remarks: item.remarks,
        });
    }
    return data;
};
exports.multiRequestData = multiRequestData;
