import Joi from "joi";
import { Request } from "express";

export interface AdvanceManagementRequestData {
  ulb_id: number;
  primary_acc_code_id: number;
  serial_no_of_estimate: string;
  work_order_no: string;
  work_name: string;
  work_nature: string;
  contract_amount: number;
  contractor_name: string;
  order_sanctioning_the_contract_no: string;
  order_sanctioning_the_contract_resolution_date: Date;
  order_sanctioning_the_estimate_no: string;
  order_sanctioning_the_estimate_date: Date;
  voucher_no: string;
  date: Date;
  amount: number;
  officer_id: number;
  bill_no: string;
  bill_date: Date;
  payable_amount: number;
  approved_amount: number;
  cumulative_approved_amount: number;
  pwd_officer_id: number;
  security_deposit_deducted_amount: number;
  tds_amount: number;
  work_contract_tax_amount: number;
  material_issued_recovery_amount: number;
  advance_provided_recovery_amount: number;
  other_deduction_amount: number;
  net_paid_amount: number;
  department_id: number;
  remarks: string;
}

const advanceManagementSchema = Joi.object({
  ulb_id: Joi.number().required(),
  primary_acc_code_id: Joi.number().required(),
  serial_no_of_estimate: Joi.string().required(),
  work_order_no: Joi.string().required(),
  work_name: Joi.string().required(),
  work_nature: Joi.string().required(),
  contract_amount: Joi.number().required(),
  contractor_name: Joi.string().required(),
  order_sanctioning_the_contract_no: Joi.string().required(),
  order_sanctioning_the_contract_resolution_date: Joi.date().required(),
  order_sanctioning_the_estimate_no: Joi.string().required(),
  order_sanctioning_the_estimate_date: Joi.date().required(),
  voucher_no: Joi.string().required(),
  date: Joi.date().required(),
  amount: Joi.number().required(),
  officer_id: Joi.number().required(),
  bill_no: Joi.string().required(),
  bill_date: Joi.date().required(),
  payable_amount: Joi.number().required(),
  approved_amount: Joi.number().required(),
  cumulative_approved_amount: Joi.number().required(),
  pwd_officer_id: Joi.number().required(),
  security_deposit_deducted_amount: Joi.number().required(),
  tds_amount: Joi.number().required(),
  work_contract_tax_amount: Joi.number().required(),
  material_issued_recovery_amount: Joi.number().required(),
  advance_provided_recovery_amount: Joi.number().required(),
  other_deduction_amount: Joi.number().required(),
  net_paid_amount: Joi.number().required(),
  department_id: Joi.number().required(),
  remarks: Joi.string().required(),
});

export const advanceManagementValidation = Joi.array().items(
  advanceManagementSchema
);
export const advanceManagementValidationWithID = advanceManagementSchema.keys({
  id: Joi.number().required(),
});
export const requestData = (req: Request): AdvanceManagementRequestData => {
  return {
    ulb_id: req.body.data.ulb_id,
    primary_acc_code_id: req.body.data.primary_acc_code_id,
    serial_no_of_estimate: req.body.data.serial_no_of_estimate,
    work_order_no: req.body.data.work_order_no,
    work_name: req.body.data.work_name,
    work_nature: req.body.data.work_nature,
    contract_amount: req.body.data.contract_amount,
    contractor_name: req.body.data.contractor_name,
    order_sanctioning_the_contract_no:
      req.body.data.order_sanctioning_the_contract_no,
    order_sanctioning_the_contract_resolution_date:
      req.body.data.order_sanctioning_the_contract_resolution_date,
    order_sanctioning_the_estimate_no:
      req.body.data.order_sanctioning_the_estimate_no,
    order_sanctioning_the_estimate_date:
      req.body.data.order_sanctioning_the_estimate_date,
    voucher_no: req.body.data.voucher_no,
    date: req.body.data.date,
    amount: req.body.data.amount,
    officer_id: req.body.data.officer_id,
    bill_no: req.body.data.bill_no,
    bill_date: req.body.data.bill_date,
    payable_amount: req.body.data.payable_amount,
    approved_amount: req.body.data.approved_amount,
    cumulative_approved_amount: req.body.data.cumulative_approved_amount,
    pwd_officer_id: req.body.data.pwd_officer_id,
    security_deposit_deducted_amount: req.body.data.security_deposit_deducted_amount,
    tds_amount: req.body.data.tds_amount,
    work_contract_tax_amount: req.body.data.work_contract_tax_amount,
    material_issued_recovery_amount: req.body.data.material_issued_recovery_amount,
    advance_provided_recovery_amount: req.body.data.advance_provided_recovery_amount,
    other_deduction_amount: req.body.data.other_deduction_amount,
    net_paid_amount: req.body.data.net_paid_amount,
    department_id: req.body.data.department_id,
    remarks: req.body.data.remarks,
  };
};
export const multiRequestData = (
  req: Request
): AdvanceManagementRequestData[] => {
  const data = [];
  for (const item of req.body.data) {
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
      order_sanctioning_the_contract_resolution_date:
        item.order_sanctioning_the_contract_resolution_date,
      order_sanctioning_the_estimate_no: item.order_sanctioning_the_estimate_no,
      order_sanctioning_the_estimate_date:
        item.order_sanctioning_the_estimate_date,
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
