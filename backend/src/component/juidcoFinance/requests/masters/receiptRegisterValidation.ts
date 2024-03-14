import Joi from "joi";
import { Request } from "express";

export interface ReceiptRegisterRequestData {
  receipt_no: string;
  ulb_id: number;
  primary_acc_code_id: number;
  revenue_module_id: number;
  paid_by: string;
  receipt_mode_id: number;
  receipt_date: Date;
  cheque_or_draft_no: string;
  bank_amount: number;
  cash_amount: number;
  bank_acc_no: string;
  deposit_date: Date;
  realisation_date: Date;
  wheather_returned: boolean;
  remarks: string;
  entered_by_id: number;
  entered_by_print_name: string;
  checked_by_id: number;
  checked_by_print_name: string;
}

const receiptRegisterSchema = Joi.object({
  receipt_no: Joi.string().required(),
  ulb_id: Joi.number().required(),
  primary_acc_code_id: Joi.number().required(),
  revenue_module_id: Joi.number().required(),
  paid_by: Joi.string().required(),
  receipt_mode_id: Joi.number().required(),
  receipt_date: Joi.date().required(),
  cheque_or_draft_no: Joi.string(),
  bank_amount: Joi.number(),
  cash_amount: Joi.number(),
  bank_acc_no: Joi.string(),
  deposit_date: Joi.date(),
  realisation_date: Joi.date(),
  wheather_returned: Joi.boolean(),
  remarks: Joi.string().required(),
  entered_by_id: Joi.number().required(),
  entered_by_print_name: Joi.string().required(),
  checked_by_id: Joi.number(),
  checked_by_print_name: Joi.string(),
});

export const receiptRegisterValidation = Joi.array().items(
  receiptRegisterSchema
);
export const receiptRegisterValidationWithID = receiptRegisterSchema.keys({
  id: Joi.number().required(),
});
export const requestData = (req: Request): ReceiptRegisterRequestData => {
  return {
    receipt_no: req.body.receipt_no,
    ulb_id: req.body.ulb_id,
    primary_acc_code_id: req.body.primary_acc_code_id,
    revenue_module_id: req.body.revenue_module_id,
    paid_by: req.body.paid_by,
    receipt_mode_id: req.body.receipt_mode_id,
    receipt_date: req.body.receipt_date,
    cheque_or_draft_no: req.body.cheque_or_draft_no,
    bank_amount: req.body.bank_amount,
    cash_amount: req.body.cash_amount,
    bank_acc_no: req.body.bank_acc_no,
    deposit_date: req.body.deposit_date,
    realisation_date: req.body.realisation_date,
    wheather_returned: req.body.wheather_returned,
    remarks: req.body.remarks,
    entered_by_id: req.body.entered_by_id,
    entered_by_print_name: req.body.entered_by_print_name,
    checked_by_id: req.body.checked_by_id,
    checked_by_print_name: req.body.checked_by_print_name,
  };
};
export const multiRequestData = (
  req: Request
): ReceiptRegisterRequestData[] => {
  const data = [];
  for (const item of req.body) {
    data.push({
      receipt_no: item.receipt_no,
      ulb_id: item.ulb_id,
      primary_acc_code_id: item.primary_acc_code_id,
      revenue_module_id: item.revenue_module_id,
      paid_by: item.paid_by,
      receipt_mode_id: item.receipt_mode_id,
      receipt_date: item.receipt_date,
      cheque_or_draft_no: item.cheque_or_draft_no,
      bank_amount: item.bank_amount,
      cash_amount: item.cash_amount,
      bank_acc_no: item.bank_acc_no,
      deposit_date: item.deposit_date,
      realisation_date: item.realisation_date,
      wheather_returned: item.wheather_returned,
      remarks: item.remarks,
      entered_by_id: item.entered_by_id,
      entered_by_print_name: item.entered_by_print_name,
      checked_by_id: item.checked_by_id,
      checked_by_print_name: item.checked_by_print_name,
    });
  }
  return data;
};

const receiptRegisterIdsSchema = Joi.object({
  id: Joi.number().required(),
});

export const receiptRegisterApproveSchema = Joi.object({
  checked_by_id: Joi.number().required(),
  checked_by_print_name: Joi.string().required(),
  ids: Joi.array().required().items(
    receiptRegisterIdsSchema
  ),
});

export const openingBalanceSchema = Joi.object({
  opening_balance: Joi.number().required()
})

export const updateOpeningBalanceSchema = Joi.object({
  id: Joi.number().required(),
  opening_balance: Joi.number().required()
})

