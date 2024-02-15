import Joi from "joi";
import { Request } from "express";

export interface OpeningBalancesRequestData {
    fin_year_id: number,
    dr_cr_id: number,
    primary_acc_code_id: number,
    amount: number,
}

const openingBalancesSchema = Joi.object({
    fin_year_id: Joi.number().required(),
    dr_cr_id: Joi.number().required(),
    primary_acc_code_id: Joi.number().required(),
    amount: Joi.number().required(),
})

export const openingBalancesValidation = Joi.array().items(
    openingBalancesSchema
);
export const openingBalancesValidationWithID = openingBalancesSchema.keys({
    id: Joi.number().required(),
});
export const requestData = (req: Request): OpeningBalancesRequestData => {
    return {
        fin_year_id: req.body.fin_year_id,
        dr_cr_id: req.body.dr_cr_id,
        primary_acc_code_id: req.body.primary_acc_code_id,
        amount: req.body.amount,
    };
};
export const multiRequestData = (req: Request): OpeningBalancesRequestData[] => {
    const data = [];
    for (const item of req.body) {
        data.push({
            fin_year_id: item.fin_year_id,
            dr_cr_id: item.dr_cr_id,
            primary_acc_code_id: item.primary_acc_code_id,
            amount: item.amount,
        });
    }
    return data;
};