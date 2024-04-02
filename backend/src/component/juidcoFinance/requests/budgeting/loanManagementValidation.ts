import Joi from "joi";
import { Request } from "express";

export interface LoanManagementRequestData {
  ulb_id: number;
  primary_acc_code_id: number;
  purpose_of_loan: string;
  department_id: number;
  resolution_date: Date;
  loan_no: string;
  loan_sanctioned_amount: number;
  interest_rate: number;
  instalments_no: number;
  instalment_amount: number;
  receipt_date: Date;
  received_amount: number;
  total_received_amount: number;
  repayment_due_date: Date;
  principal_amount: number;
  interest_amount: number;
  total_due_amount_to_repayment: number;
  repaid_repayment_date: Date;
  officer_id: number;
  repaid_principal_amount: number;
  repaid_interest: number;
  repaid_total_amount: number;
  balance_principal_amount: number;
  balance_interest: number;
  balance_total_amount: number;
  balance_remarks: string;
  user_id: number;
  designation_id: number;
}

const loanManagementSchema = Joi.object({
  ulb_id: Joi.number().required(),
  primary_acc_code_id: Joi.number().required(),
  purpose_of_loan: Joi.string().required(),
  department_id: Joi.number().required(),
  resolution_date: Joi.date().required(),
  loan_no: Joi.string().required(),
  loan_sanctioned_amount: Joi.number().required(),
  interest_rate: Joi.number().required(),
  instalments_no: Joi.number().required(),
  instalment_amount: Joi.number().required(),
  receipt_date: Joi.date().required(),
  repaid_repayment_date: Joi.date().required(),
  received_amount: Joi.number().required(),
  total_received_amount: Joi.number().required(),
  repayment_due_date: Joi.date().required(),
  principal_amount: Joi.number().required(),
  interest_amount: Joi.number().required(),
  total_due_amount_to_repayment: Joi.number().required(),
  officer_id: Joi.number().required(),
  repaid_principal_amount: Joi.number().required(),
  repaid_interest: Joi.number().required(),
  repaid_total_amount: Joi.number().required(),
  balance_principal_amount: Joi.number().required(),
  balance_interest: Joi.number().required(),
  balance_total_amount: Joi.number().required(),
  balance_remarks: Joi.string().required(),
  user_id: Joi.number().required(),
  designation_id: Joi.number().required(),
});

export const loanManagementValidation = Joi.array().items(loanManagementSchema);
export const loanManagementValidationWithID = loanManagementSchema.keys({
  id: Joi.number().required(),
});
export const requestData = (req: Request): LoanManagementRequestData => {
  return {
    ulb_id: req.body.data.ulb_id,
    primary_acc_code_id: req.body.data.primary_acc_code_id,
    purpose_of_loan: req.body.data.purpose_of_loan,
    department_id: req.body.data.department_id,
    resolution_date: req.body.data.resolution_date,
    loan_no: req.body.data.loan_no,
    loan_sanctioned_amount: req.body.data.loan_sanctioned_amount,
    interest_rate: req.body.data.interest_rate,
    instalments_no: req.body.data.instalments_no,
    instalment_amount: req.body.data.instalment_amount,
    receipt_date: req.body.data.receipt_date,
    received_amount: req.body.data.received_amount,
    total_received_amount: req.body.data.total_received_amount,
    repayment_due_date: req.body.data.repayment_due_date,
    principal_amount: req.body.data.principal_amount,
    interest_amount: req.body.data.interest_amount,
    total_due_amount_to_repayment: req.body.data.total_due_amount_to_repayment,
    officer_id: req.body.data.officer_id,
    repaid_repayment_date: req.body.data.repaid_repayment_date,
    repaid_principal_amount: req.body.data.repaid_principal_amount,
    repaid_interest: req.body.data.repaid_interest,
    repaid_total_amount: req.body.data.repaid_total_amount,
    balance_principal_amount: req.body.data.balance_principal_amount,
    balance_interest: req.body.data.balance_interest,
    balance_total_amount: req.body.data.balance_total_amount,
    balance_remarks: req.body.data.balance_remarks,
    user_id: req.body.data.user_id,
    designation_id: req.body.data.designation_id,
  };
};
export const multiRequestData = (req: Request): LoanManagementRequestData[] => {
  const data = [];
  for (const item of req.body.data) {
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
      user_id: item.user_id,
      designation_id: item.designation_id,
    });
  }
  return data;
};
