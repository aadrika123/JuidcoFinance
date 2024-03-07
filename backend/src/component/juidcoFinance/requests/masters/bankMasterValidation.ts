import Joi from "joi";
import { BankRequestData } from "../../../../util/types";
import { Request } from "express";

// Validating request data
export const bankMasterValidation = Joi.object({
  id: Joi.number(),
  bank_id: Joi.number().required(),
  bank_type_id: Joi.number().required(),
  ulb_id: Joi.number().required(),
  ifsc_code: Joi.string().required(),
  branch: Joi.string().required(),
  micr_code: Joi.string(),
  branch_address: Joi.string().required(),
  branch_city: Joi.string().required(),
  branch_state: Joi.string().required(),
  branch_district: Joi.string(),
  email: Joi.string().email(),
  contact_no: Joi.string().regex(/^\d{10}$/),
});

// arrange request data for store and update
export const requestData = (req: Request): BankRequestData => {
  return {
    bank_id: req.body.bank_id,
    ulb_id: req.body.ulb_id,
    bank_type_id: req.body.bank_type_id,
    ifsc_code: req.body.ifsc_code,
    branch: req.body.branch,
    micr_code: req.body.micr_code,
    branch_address: req.body.branch_address,
    branch_city: req.body.branch_city,
    branch_state: req.body.branch_state,
    branch_district: req.body.branch_district,
    email: req.body.email,
    contact_no: req.body.contact_no,
  };
};
