"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiRequestData = exports.requestData = exports.loanManagementValidationWithID = exports.loanManagementValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const loanManagementSchema = joi_1.default.object({
    ulb_id: joi_1.default.number().required(),
    primary_acc_code_id: joi_1.default.number().required(),
    purpose_of_loan: joi_1.default.string().required(),
    department_id: joi_1.default.number().required(),
    resolution_date: joi_1.default.date().required(),
    loan_no: joi_1.default.string().required(),
    loan_sanctioned_amount: joi_1.default.number().required(),
    interest_rate: joi_1.default.number().required(),
    instalments_no: joi_1.default.number().required(),
    instalment_amount: joi_1.default.number().required(),
    receipt_date: joi_1.default.date().required(),
    repaid_repayment_date: joi_1.default.date().required(),
    received_amount: joi_1.default.number().required(),
    total_received_amount: joi_1.default.number().required(),
    repayment_due_date: joi_1.default.date().required(),
    principal_amount: joi_1.default.number().required(),
    interest_amount: joi_1.default.number().required(),
    total_due_amount_to_repayment: joi_1.default.number().required(),
    officer_id: joi_1.default.number().required(),
    repaid_principal_amount: joi_1.default.number().required(),
    repaid_interest: joi_1.default.number().required(),
    repaid_total_amount: joi_1.default.number().required(),
    balance_principal_amount: joi_1.default.number().required(),
    balance_interest: joi_1.default.number().required(),
    balance_total_amount: joi_1.default.number().required(),
    balance_remarks: joi_1.default.string().required(),
    employee_id: joi_1.default.number().required(),
    designation_id: joi_1.default.number().required(),
});
exports.loanManagementValidation = joi_1.default.array().items(loanManagementSchema);
exports.loanManagementValidationWithID = loanManagementSchema.keys({
    id: joi_1.default.number().required(),
});
const requestData = (req) => {
    return {
        ulb_id: req.body.ulb_id,
        primary_acc_code_id: req.body.primary_acc_code_id,
        purpose_of_loan: req.body.purpose_of_loan,
        department_id: req.body.department_id,
        resolution_date: req.body.resolution_date,
        loan_no: req.body.loan_no,
        loan_sanctioned_amount: req.body.loan_sanctioned_amount,
        interest_rate: req.body.interest_rate,
        instalments_no: req.body.instalments_no,
        instalment_amount: req.body.instalment_amount,
        receipt_date: req.body.receipt_date,
        received_amount: req.body.received_amount,
        total_received_amount: req.body.total_received_amount,
        repayment_due_date: req.body.repayment_due_date,
        principal_amount: req.body.principal_amount,
        interest_amount: req.body.interest_amount,
        total_due_amount_to_repayment: req.body.total_due_amount_to_repayment,
        officer_id: req.body.officer_id,
        repaid_repayment_date: req.body.repaid_repayment_date,
        repaid_principal_amount: req.body.repaid_principal_amount,
        repaid_interest: req.body.repaid_interest,
        repaid_total_amount: req.body.repaid_total_amount,
        balance_principal_amount: req.body.balance_principal_amount,
        balance_interest: req.body.balance_interest,
        balance_total_amount: req.body.balance_total_amount,
        balance_remarks: req.body.balance_remarks,
        employee_id: req.body.employee_id,
        designation_id: req.body.designation_id,
    };
};
exports.requestData = requestData;
const multiRequestData = (req) => {
    const data = [];
    for (const item of req.body) {
        data.push({
            ulb_id: item.ulb_id,
            primary_acc_code_id: item.primary_acc_code_id,
            purpose_of_loan: item.purpose_of_loan,
            department_id: item.department_id,
            resolution_date: item.resolution_date,
            loan_no: item.loan_no,
            loan_sanctioned_amount: item.loan_sanctioned_amount,
            interest_rate: item.interest_rate,
            instalments_no: item.instalments_no,
            instalment_amount: item.instalment_amount,
            receipt_date: item.receipt_date,
            received_amount: item.received_amount,
            total_received_amount: item.total_received_amount,
            repayment_due_date: item.repayment_due_date,
            principal_amount: item.principal_amount,
            interest_amount: item.interest_amount,
            total_due_amount_to_repayment: item.total_due_amount_to_repayment,
            officer_id: item.officer_id,
            repaid_repayment_date: item.repaid_repayment_date,
            repaid_principal_amount: item.repaid_principal_amount,
            repaid_interest: item.repaid_interest,
            repaid_total_amount: item.repaid_total_amount,
            balance_principal_amount: item.balance_principal_amount,
            balance_interest: item.balance_interest,
            balance_total_amount: item.balance_total_amount,
            balance_remarks: item.balance_remarks,
            employee_id: item.employee_id,
            designation_id: item.designation_id,
        });
    }
    return data;
};
exports.multiRequestData = multiRequestData;
