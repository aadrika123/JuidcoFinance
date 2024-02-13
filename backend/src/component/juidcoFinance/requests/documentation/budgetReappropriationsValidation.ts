import Joi from "joi";
import { Request } from "express";

export interface BudgetReappropriationsRequestData {
    fin_year_id: number,
    primary_acc_code_id: number,
    transaction_date: Date,
    budget_name_id: number,
    actual_amount: number,
    from_primary_acc_code_id: number,
    approved_amount: number,
    balance_amount: number,
    transfer_amount: number,
    remark: string,
}

const budgetReappropriationsSchema = Joi.object({
    fin_year_id: Joi.number().required(),
    primary_acc_code_id: Joi.number().required(),
    transaction_date: Joi.date().required(),
    budget_name_id: Joi.number().required(),
    actual_amount: Joi.number().required(),
    from_primary_acc_code_id: Joi.number().required(),
    approved_amount: Joi.number().required(),
    balance_amount: Joi.number().required(),
    transfer_amount: Joi.number().required(),
    remark: Joi.string().required(),
})

export const budgetReappropriationsValidation = Joi.array().items(
    budgetReappropriationsSchema
);
export const budgetReappropriationsValidationWithID = budgetReappropriationsSchema.keys({
    id: Joi.number().required(),
});
export const requestData = (req: Request): BudgetReappropriationsRequestData => {
    return {
        fin_year_id: req.body.fin_year_id,
        primary_acc_code_id: req.body.primary_acc_code_id,
        transaction_date: req.body.transaction_date,
        budget_name_id: req.body.budget_name_id,
        actual_amount: req.body.actual_amount,
        from_primary_acc_code_id: req.body.from_primary_acc_code_id,
        approved_amount: req.body.approved_amount,
        balance_amount: req.body.balance_amount,
        transfer_amount: req.body.transfer_amount,
        remark: req.body.remark,
    };
};
export const multiRequestData = (req: Request): BudgetReappropriationsRequestData[] => {
    const data = [];
    for (const item of req.body) {
        data.push({
            fin_year_id: item.fin_year_id,
            primary_acc_code_id: item.primary_acc_code_id,
            transaction_date: item.transaction_date,
            budget_name_id: item.budget_name_id,
            actual_amount: item.actual_amount,
            from_primary_acc_code_id: item.from_primary_acc_code_id,
            approved_amount: item.approved_amount,
            balance_amount: item.balance_amount,
            transfer_amount: item.transfer_amount,
            remark: item.remark,
        });
    }
    return data;
};