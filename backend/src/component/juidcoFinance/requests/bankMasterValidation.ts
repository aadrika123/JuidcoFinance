import Joi from "joi";

export const bankMasterValidation = Joi.object({
    id: Joi.number(),
    bank_name: Joi.string().required(),
    ifsc_code: Joi.string().required(),
    branch: Joi.string().required(),
    micr_code: Joi.string().required(),
    branch_address: Joi.string().required(),
    branch_city: Joi.string().required(),
    branch_state: Joi.string().required(),
    branch_district: Joi.string().required(),
    email: Joi.string().email().required(),
    contact_no: Joi.string().required(),
    contact_person_name: Joi.string().required()
});

