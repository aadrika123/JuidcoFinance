import Joi from "joi";

export const vendorMasterValidation = Joi.object({
  id: Joi.number(),
  vendorTypeId: Joi.number().required(),
  vendorNo: Joi.string().required(),
  name: Joi.string().required(),
  mobileNo: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  commAddress: Joi.string().required(),
  tinNo: Joi.string().allow(null, "").optional(),
  panNo: Joi.string().allow(null, "").optional(),
  bankName: Joi.string().required(),
  ifscCode: Joi.string().required(),
  departmentId: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  officeAddress: Joi.string().required(),
  gstNo: Joi.string().allow(null, "").optional(),
  aadharNo: Joi.string()
    .pattern(/^[0-9]{12}$/)
    .allow(null, "")
    .optional(),
  bankAccountNo: Joi.string().required(),
  bankBranchName: Joi.string().required(),
});
