import Joi from "joi";

export const requestNewAccCodeSchema = Joi.object({
    id: Joi.number(),
    ulb_id: Joi.number().required(),
    request_no: Joi.string().required(),
    employee_id: Joi.number().required(),
    date: Joi.date().iso().required(),
    group_ref: Joi.string().required(),
    code_ref: Joi.string().required(),
    description: Joi.string().required(),
})