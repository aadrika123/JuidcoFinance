import Joi from "joi";
import { Request } from "express";


export interface ReceiptRequestData {
  receipt_no: string,
  date: Date,
  paid_by: string,
  email: string,
  module_id: number,
  receipt_type_id: number,
  mobile_no: string,
  admin_ward_id: number,
  narration: string,
  subledger_id: number,
  amount: number
}

// Validating request data
const receiptSchema = Joi.object({
  receipt_no: Joi.string().required(),
  date: Joi.string().required(),
  paid_by: Joi.string().required(),
  email: Joi.string().required(),
  module_id: Joi.number().required(),
  receipt_type_id: Joi.number().required(),
  mobile_no: Joi.string().required(),
  admin_ward_id: Joi.number().required(),
  narration: Joi.string().required(),
  subledger_id: Joi.number().required(),
  amount: Joi.number().required()
});

export const receiptValidation = Joi.array().items(
  receiptSchema
);

// Validating request data for update
export const receiptValidationWithID = receiptSchema.keys({
  id: Joi.number().required(),
});

// collect request data for update
export const requestData = (req: Request): ReceiptRequestData => {

  return {
    receipt_no: req.body.data.receipt_no,
    date: req.body.data.date,
    paid_by: req.body.data.paid_by,
    email: req.body.data.email,
    module_id: req.body.data.module_id,
    receipt_type_id: req.body.data.receipt_type_id,
    mobile_no: req.body.data.mobile_no,
    admin_ward_id: req.body.data.admin_ward_id,
    narration: req.body.data.narration,
    subledger_id: req.body.data.subledger_id,
    amount: req.body.data.amount
  };
};


// collect request data for storing
export const multiRequestData = (req: Request): ReceiptRequestData [] => {
  const data = [];
  for(const item of req.body.data) {
    data.push({
      receipt_no: item.receipt_no,
      date: item.date,
      paid_by: item.paid_by,
      email: item.email,
      module_id: item.module_id,
      receipt_type_id: item.receipt_type_id,
      mobile_no: item.mobile_no,
      admin_ward_id: item.admin_ward_id,
      narration: item.narration,
      subledger_id: item.subledger_id,
      amount: item.amount
    });
  }
  return data;
};
