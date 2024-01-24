import Joi from "joi";

export const vendorMasterValidation = Joi.object({
  id: Joi.number(),
  vendor_type_id: Joi.number().required(),
  vendor_no: Joi.string().required(),
  name: Joi.string().required(),
  mobile_no: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  comm_address: Joi.string().required(),
  tin_no: Joi.string().allow(null, "").optional(),
  pan_no: Joi.string().allow(null, "").optional(),
  bank_name: Joi.string().required(),
  ifsc_code: Joi.string().required(),
  department_id: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  office_address: Joi.string().required(),
  gst_no: Joi.string().allow(null, "").optional(),
  aadhar_no: Joi.string()
    .pattern(/^[0-9]{12}$/)
    .allow(null, "")
    .optional(),
  bank_account_no: Joi.string().required(),
  bank_branch_name: Joi.string().required(),
});
