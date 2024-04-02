import Joi from "joi";
import { Request } from "express";

export interface BudgetAppropriationsRequestData {
    fin_year_id: number,
    primary_acc_code_id: number,
    remark: string,
    from_primary_acc_code_id: number,
    approved_amount: number,
    transfer_amount: number,
}

const budgetAppropriationsSchema = Joi.object({
    fin_year_id: Joi.number().required(),
    primary_acc_code_id: Joi.number().required(),
    remark: Joi.string().required(),
    from_primary_acc_code_id: Joi.number().required(),
    approved_amount: Joi.number().required(),
    transfer_amount: Joi.number().required(),
})

export const budgetAppropriationsValidation = Joi.array().items(
    budgetAppropriationsSchema
);
export const budgetAppropriationsValidationWithID = budgetAppropriationsSchema.keys({
    id: Joi.number().required(),
});
export const requestData = (req: Request): BudgetAppropriationsRequestData => {
    return {
        fin_year_id: req.body.data.fin_year_id,
        primary_acc_code_id: req.body.data.primary_acc_code_id,
        remark: req.body.data.remark,
        from_primary_acc_code_id: req.body.data.from_primary_acc_code_id,
        approved_amount: req.body.data.approved_amount,
        transfer_amount: req.body.data.transfer_amount,
    };
};
export const multiRequestData = (req: Request): BudgetAppropriationsRequestData[] => {
    const data = [];
    for (const item of req.body.data) {
        data.push({
            fin_year_id: item.fin_year_id,
            primary_acc_code_id: item.primary_acc_code_id,
            remark: item.remark,
            from_primary_acc_code_id: item.from_primary_acc_code_id,
            approved_amount: item.approved_amount,
            transfer_amount: item.transfer_amount,
        });
    }
    return data;
};