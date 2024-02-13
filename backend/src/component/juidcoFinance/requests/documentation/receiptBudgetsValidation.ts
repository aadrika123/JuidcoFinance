import Joi from "joi";
import { Request } from "express";

export interface ReceiptBudgetsRequestData {
    fin_year_id: number,
    department_id: number,
    primary_acc_code_id: number,
    admin_ward_id: number,
    budget_type_id: number,
    amount: number,
}

const receiptBudgetsSchema = Joi.object({
    fin_year_id: Joi.number().required(),
    department_id: Joi.number().required(),
    primary_acc_code_id: Joi.number().required(),
    admin_ward_id: Joi.number().required(),
    budget_type_id: Joi.number().required(),
    amount: Joi.number().required(),
})

export const receiptBudgetsValidation = Joi.array().items(
    receiptBudgetsSchema
);
export const receiptBudgetsValidationWithID = receiptBudgetsSchema.keys({
    id: Joi.number().required(),
});
export const requestData = (req: Request): ReceiptBudgetsRequestData => {
    return {
        fin_year_id: req.body.fin_year_id,
        department_id: req.body.department_id,
        primary_acc_code_id: req.body.primary_acc_code_id,
        admin_ward_id: req.body.admin_ward_id,
        budget_type_id: req.body.budget_type_id,
        amount: req.body.amount,
    };
};
export const multiRequestData = (req: Request): ReceiptBudgetsRequestData[] => {
    const data = [];
    for (const item of req.body) {
        data.push({
            fin_year_id: item.fin_year_id,
            department_id: item.department_id,
            primary_acc_code_id: item.primary_acc_code_id,
            admin_ward_id: item.admin_ward_id,
            budget_type_id: item.budget_type_id,
            amount: item.amount,
        });
    }
    return data;
};