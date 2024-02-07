import Joi from "joi";
import { BillPaymentEntryRequestData } from "../../../../util/types";
import { Request } from "express";
import { generateUniquePaymentNo } from "../../../../util/helper/generateUniqueNo";

// Validating request data
export const billPaymentEntrySchema = Joi.object({
  bill_no: Joi.number().required(),
  bill_type_id: Joi.number().required(),
  bill_entry_date: Joi.date().required(),
  department_id: Joi.number().required(),
  vendor_name: Joi.string().required(),
  address: Joi.string().required(),
  payee_name_id: Joi.number().required(),
  adminis_ward_id: Joi.number().required(),
  bill_amount: Joi.number().required(),
  advance: Joi.number().required(),
  deposit: Joi.number().required(),
  deductions_amount: Joi.number().required(),
  earlier_payment: Joi.number().required(),
  payable_amount: Joi.number().required(),
  net_amount: Joi.number().required(),
});
export const billPaymentEntryValidation = Joi.array().items(
  billPaymentEntrySchema
);

// Validating request data for update
export const billPaymentEntryValidationAlongWithID =
  billPaymentEntrySchema.keys({
    id: Joi.number().required(),
  });

// arrange request data for update
export const requestData = (req: Request): BillPaymentEntryRequestData => {
  return {
    bill_no: req.body.bill_no,
    bill_type_id: req.body.bill_type_id,
    bill_entry_date: req.body.bill_entry_date,
    department_id: req.body.department_id,
    vendor_name: req.body.vendor_name,
    address: req.body.address,
    payee_name_id: req.body.payee_name_id,
    adminis_ward_id: req.body.adminis_ward_id,
    bill_amount: req.body.bill_amount,
    advance: req.body.advance,
    deposit: req.body.deposit,
    deductions_amount: req.body.deductions_amount,
    earlier_payment: req.body.earlier_payment,
    payable_amount: req.body.payable_amount,
    net_amount: req.body.net_amount,
  };
};

// arrange request data for store
export const multiRequestData = (
  req: Request
): BillPaymentEntryRequestData[] => {
  const data = [];
  for (const item of req.body) {
    data.push({
      bill_no: generateUniquePaymentNo("bn"),
      bill_type_id: item.bill_type_id,
      bill_entry_date: item.bill_entry_date,
      department_id: item.department_id,
      vendor_name: item.vendor_name,
      address: item.address,
      payee_name_id: item.payee_name_id,
      adminis_ward_id: item.adminis_ward_id,
      bill_amount: item.bill_amount,
      advance: item.advance,
      deposit: item.deposit,
      deductions_amount: item.deductions_amount,
      earlier_payment: item.earlier_payment,
      payable_amount: item.payable_amount,
      net_amount: item.net_amount,
    });
  }

  return data;
};
