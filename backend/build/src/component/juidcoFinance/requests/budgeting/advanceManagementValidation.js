"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiRequestData = exports.requestData = exports.advanceManagementValidationWithID = exports.advanceManagementValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const advanceManagementSchema = joi_1.default.object({
    ulb_id: joi_1.default.number().required(),
    primary_acc_code_id: joi_1.default.number().required(),
    serial_no_of_estimate: joi_1.default.string().required(),
    work_order_no: joi_1.default.string().required(),
    work_name: joi_1.default.string().required(),
    work_nature: joi_1.default.string().required(),
    contract_amount: joi_1.default.number().required(),
    contractor_name: joi_1.default.string().required(),
    order_sanctioning_the_contract_no: joi_1.default.string().required(),
    order_sanctioning_the_contract_resolution_date: joi_1.default.date().required(),
    order_sanctioning_the_estimate_no: joi_1.default.string().required(),
    order_sanctioning_the_estimate_date: joi_1.default.date().required(),
    voucher_no: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
    amount: joi_1.default.number().required(),
    officer_id: joi_1.default.number().required(),
    bill_no: joi_1.default.string().required(),
    bill_date: joi_1.default.date().required(),
    payable_amount: joi_1.default.number().required(),
    approved_amount: joi_1.default.number().required(),
    cumulative_approved_amount: joi_1.default.number().required(),
    pwd_officer_id: joi_1.default.number().required(),
    security_deposit_deducted_amount: joi_1.default.number().required(),
    tds_amount: joi_1.default.number().required(),
    work_contract_tax_amount: joi_1.default.number().required(),
    material_issued_recovery_amount: joi_1.default.number().required(),
    advance_provided_recovery_amount: joi_1.default.number().required(),
    other_deduction_amount: joi_1.default.number().required(),
    net_paid_amount: joi_1.default.number().required(),
    department_id: joi_1.default.number().required(),
    remarks: joi_1.default.string().required(),
});
exports.advanceManagementValidation = joi_1.default.array().items(advanceManagementSchema);
exports.advanceManagementValidationWithID = advanceManagementSchema.keys({
    id: joi_1.default.number().required(),
});
const requestData = (req) => {
    return {
        ulb_id: req.body.ulb_id,
        primary_acc_code_id: req.body.primary_acc_code_id,
        serial_no_of_estimate: req.body.serial_no_of_estimate,
        work_order_no: req.body.work_order_no,
        work_name: req.body.work_name,
        work_nature: req.body.work_nature,
        contract_amount: req.body.contract_amount,
        contractor_name: req.body.contractor_name,
        order_sanctioning_the_contract_no: req.body.order_sanctioning_the_contract_no,
        order_sanctioning_the_contract_resolution_date: req.body.order_sanctioning_the_contract_resolution_date,
        order_sanctioning_the_estimate_no: req.body.order_sanctioning_the_estimate_no,
        order_sanctioning_the_estimate_date: req.body.order_sanctioning_the_estimate_date,
        voucher_no: req.body.voucher_no,
        date: req.body.date,
        amount: req.body.amount,
        officer_id: req.body.officer_id,
        bill_no: req.body.bill_no,
        bill_date: req.body.bill_date,
        payable_amount: req.body.payable_amount,
        approved_amount: req.body.approved_amount,
        cumulative_approved_amount: req.body.cumulative_approved_amount,
        pwd_officer_id: req.body.pwd_officer_id,
        security_deposit_deducted_amount: req.body.security_deposit_deducted_amount,
        tds_amount: req.body.tds_amount,
        work_contract_tax_amount: req.body.work_contract_tax_amount,
        material_issued_recovery_amount: req.body.material_issued_recovery_amount,
        advance_provided_recovery_amount: req.body.advance_provided_recovery_amount,
        other_deduction_amount: req.body.other_deduction_amount,
        net_paid_amount: req.body.net_paid_amount,
        department_id: req.body.department_id,
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
            serial_no_of_estimate: item.serial_no_of_estimate,
            work_order_no: item.work_order_no,
            work_name: item.work_name,
            work_nature: item.work_nature,
            contract_amount: item.contract_amount,
            contractor_name: item.contractor_name,
            order_sanctioning_the_contract_no: item.order_sanctioning_the_contract_no,
            order_sanctioning_the_contract_resolution_date: item.order_sanctioning_the_contract_resolution_date,
            order_sanctioning_the_estimate_no: item.order_sanctioning_the_estimate_no,
            order_sanctioning_the_estimate_date: item.order_sanctioning_the_estimate_date,
            voucher_no: item.voucher_no,
            date: item.date,
            amount: item.amount,
            officer_id: item.officer_id,
            bill_no: item.bill_no,
            bill_date: item.bill_date,
            payable_amount: item.payable_amount,
            approved_amount: item.approved_amount,
            cumulative_approved_amount: item.cumulative_approved_amount,
            pwd_officer_id: item.pwd_officer_id,
            security_deposit_deducted_amount: item.security_deposit_deducted_amount,
            tds_amount: item.tds_amount,
            work_contract_tax_amount: item.work_contract_tax_amount,
            material_issued_recovery_amount: item.material_issued_recovery_amount,
            advance_provided_recovery_amount: item.advance_provided_recovery_amount,
            other_deduction_amount: item.other_deduction_amount,
            net_paid_amount: item.net_paid_amount,
            department_id: item.department_id,
            remarks: item.remarks,
        });
    }
    return data;
};
exports.multiRequestData = multiRequestData;
