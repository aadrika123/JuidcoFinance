import Joi from "joi";
import { DirPaymentEntryRequestData } from "../../../../util/types";
import { Request } from "express";

// Validating request data
export const dirPaymentEntryValidation = Joi.object({
  payment_date: Joi.date().required(),
  payment_type_id: Joi.number().required(),
  payee_name: Joi.string().required(),
  narration: Joi.string().required(),
  grant_id: Joi.number().required(),
  user_common_budget: Joi.boolean().required(),
  adminis_ward_id: Joi.number().required(),
  address: Joi.string().required(),
  email: Joi.string().email().required(),
  department_id: Joi.number().required(),
  payment_mode: Joi.string().required(),
  amount: Joi.number().required(),
});

// Validating request data for update
export const dirPaymentEntryValidationAlongWithID = dirPaymentEntryValidation.keys({
  id: Joi.number().required()
});

// arrange request data for store and update
export const requestData = (req: Request): DirPaymentEntryRequestData => {
  return {
    payment_date: req.body.payment_date,
    payment_no: req.body.payment_no,
    payment_type_id: req.body.payment_type_id,
    payee_name: req.body.payee_name,
    narration: req.body.narration,
    grant_id: req.body.grant_id,
    user_common_budget: req.body.user_common_budget,
    adminis_ward_id: req.body.adminis_ward_id,
    address: req.body.address,
    department_id: req.body.department_id,
    email: req.body.email,
    payment_mode: req.body.payment_mode,
    amount: req.body.amount,
  };
};
