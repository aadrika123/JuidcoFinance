import Joi from "joi";
import { Request } from "express";


export interface BillInvoicesRequestData {
  bill_no: string,
  type_id: number,
  vendor_id: number,
  department_id: number,
  bill_date: Date,
  entry_date: Date,
  stage_id: number,
  address: string,
  narration: string,
  admin_ward_id: number,
  amount: number
}

// Validating request data
const billInvoicesSchema = Joi.object({
  bill_no: Joi.string().required(),
  type_id: Joi.number().required(),
  vendor_id: Joi.number().required(),
  department_id: Joi.number().required(),
  bill_date: Joi.date().required(),
  entry_date: Joi.date().required(),
  stage_id: Joi.number().required(),
  address: Joi.string().required(),
  narration: Joi.string().required(),
  admin_ward_id: Joi.number().required(),
  amount: Joi.number().required()
});

export const billInvoicesValidation = Joi.array().items(
  billInvoicesSchema
);

// Validating request data for update
export const billInvoicesValidationWithID = billInvoicesSchema.keys({
  id: Joi.number().required(),
});

// collect request data for update
export const requestData = (req: Request): BillInvoicesRequestData => {

  return {
    bill_no: req.body.data.bill_no,
    type_id: req.body.data.type_id,
    vendor_id: req.body.data.vendor_id,
    department_id: req.body.data.department_id,
    bill_date: req.body.data.bill_date,
    entry_date: req.body.data.entry_date,
    stage_id: req.body.data.stage_id,
    address: req.body.data.address,
    narration: req.body.data.narration,
    admin_ward_id: req.body.data.admin_ward_id,
    amount: req.body.data.amount
  };
};


// collect request data for storing
export const multiRequestData = (req: Request): BillInvoicesRequestData [] => {
  const data = [];
  for(const item of req.body.data) {
    data.push({
      bill_no: item.bill_no,
      type_id: item.type_id,
      vendor_id: item.vendor_id,
      department_id: item.department_id,
      bill_date: item.bill_date,
      entry_date: item.entry_date,
      stage_id: item.stage_id,
      address: item.address,
      narration: item.narration,
      admin_ward_id: item.admin_ward_id,
      amount: item.amount
    });
  }
  return data;
};
