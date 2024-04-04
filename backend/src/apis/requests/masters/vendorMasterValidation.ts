import Joi from "joi";
import { VendorRequestData } from "../../../util/types";
import { Request } from "express";
import { generateUniquePaymentNo } from "../../../util/helper/generateUniqueNo";

// Validating request data
export const vendorMasterValidation = Joi.object({
  id: Joi.number(),
  vendor_type_id: Joi.number().required(),
  name: Joi.string().required(),
  mobile_no: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  tin_no: Joi.string().allow(null, "").optional(),
  pan_no: Joi.string().allow(null, "").optional(),
  bank_id: Joi.number().required(),
  ifsc_code: Joi.string().required(),
  department_id: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  contact_address: Joi.string().required(),
  gst_no: Joi.string().allow(null, "").optional(),
  aadhar_no: Joi.string()
    .pattern(/^[0-9]{12}$/)
    .allow(null, "")
    .optional(),
  bank_account_no: Joi.string().required(),
  bank_branch_name: Joi.string().required(),
});

// arrange request data for store and update
export const vendorRequestData = (req: Request): VendorRequestData => {
  return {
    vendor_type_id: req.body.data.vendor_type_id,
      vendor_no: req.body.data.vendor_no || generateUniquePaymentNo("vn"),
      name: req.body.data.name,
      mobile_no: req.body.data.mobile_no,
      tin_no: req.body.data.tin_no,
      pan_no: req.body.data.pan_no,
      bank_id: req.body.data.bank_id,
      ifsc_code: req.body.data.ifsc_code,
      department_id: req.body.data.department_id,
      email: req.body.data.email,
      contact_address: req.body.data.contact_address,
      gst_no: req.body.data.gst_no,
      aadhar_no: req.body.data.aadhar_no,
      bank_account_no: req.body.data.bank_account_no,
      bank_branch_name: req.body.data.bank_branch_name,
  };
};
