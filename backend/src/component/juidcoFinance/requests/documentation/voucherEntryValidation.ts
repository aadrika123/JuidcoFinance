import Joi from "joi";
import type { VoucherEntryRequestData } from "../../../../util/types";
import { Request } from "express";

// Validating request data
export const voucherEntryValidation = Joi.object({
  voucher_no: Joi.number().required(),
  voucher_date: Joi.string().required(),
  voucher_type_id: Joi.number().required(),
  narration: Joi.string().required(),
  department_id: Joi.number().required(),
  adminis_ward_id: Joi.number().required(),
  voucher_sub_id: Joi.number().required(),
  sub_ledger_id: Joi.number().required(),
  amount: Joi.number().required(),
  dr_cr: Joi.number().required(),
});

// arrange request data for store and update
export const requestData = (req: Request): VoucherEntryRequestData => {
  return {
    voucher_no: req.body.voucher_no,
    voucher_date: req.body.voucher_date,
    voucher_type_id: req.body.voucher_type_id,
    narration: req.body.narration,
    department_id: req.body.department_id,
    adminis_ward_id: req.body.adminis_ward_id,
    voucher_sub_id: req.body.voucher_sub_id,
    sub_ledger_id: req.body.sub_ledger_id,
    amount: req.body.amount,
    dr_cr: req.body.dr_cr,
  };
};
