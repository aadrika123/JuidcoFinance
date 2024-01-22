import Joi from "joi";

export const bankMasterValidation = Joi.object({
    bankName: Joi.string().required(),
    ifscCode: Joi.string().required(),
    branch: Joi.string().required(),
    micrCode: Joi.string().required(),
    branchAddress: Joi.string().required(),
    branchCity: Joi.string().required(),
    branchState: Joi.string().required(),
    branchDistrict: Joi.string().required(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    contactPersonName: Joi.string().required()
});
