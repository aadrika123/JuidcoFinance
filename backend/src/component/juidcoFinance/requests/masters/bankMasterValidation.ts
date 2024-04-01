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
  email: Joi.string().email({ tlds: { allow: false } }),
  contact_no: Joi.string().regex(/^\d{10}$/),
});


// validating updation data
export const bankMasterUpdateValidation = Joi.object({
  id: Joi.number().required(),
  bank_id: Joi.number(),
  bank_type_id: Joi.number(),
  ulb_id: Joi.number(),
  ifsc_code: Joi.string(),
  branch: Joi.string(),
  micr_code: Joi.string(),
  branch_address: Joi.string(),
  branch_city: Joi.string(),
  branch_state: Joi.string(),
  branch_district: Joi.string(),
  email: Joi.string().email({ tlds: { allow: false } }),
  contact_no: Joi.string().regex(/^\d{10}$/),
});


// arrange request data for store
export const requestData = (data: any): BankRequestData => {
  return {
    bank_id: data.bank_id,
    ulb_id: data.ulb_id,
    bank_type_id: data.bank_type_id,
    ifsc_code: data.ifsc_code,
    branch: data.branch,
    micr_code: data.micr_code,
    branch_address: data.branch_address,
    branch_city: data.branch_city,
    branch_state: data.branch_state,
    branch_district: data.branch_district,
    email: data.email,
    contact_no: data.contact_no,
  };
};
