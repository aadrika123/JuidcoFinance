import Joi from "joi";
import { Request } from "express";

export interface BalanceTrackingsRequestData {
    primary_acc_code_id: number,
    debit_balance: number,
    credit_balance: number,
    total_balance: number,
}

const balanceTrackingsSchema = Joi.object({
    primary_acc_code_id: Joi.number().required(),
    balance_amount: Joi.number().required(),
    debit_balance: Joi.number().required(),
    credit_balance: Joi.number().required(),
})

export const balanceTrackingsValidation = Joi.array().items(
    balanceTrackingsSchema
);
export const balanceTrackingsValidationWithID = balanceTrackingsSchema.keys({
    id: Joi.number().required(),
});
export const requestData = (req: Request): BalanceTrackingsRequestData => {
    return {
        primary_acc_code_id: req.body.data.primary_acc_code_id,
        total_balance: req.body.data.balance_amount,
        debit_balance: req.body.data.debit_balance,
        credit_balance: req.body.data.credit_balance
    };
};
export const multiRequestData = (req: Request): BalanceTrackingsRequestData[] => {
    const data = [];
    for (const item of req.body.data) {
        data.push({
            primary_acc_code_id: item.primary_acc_code_id,
            total_balance: item.balance_amount,
            debit_balance: item.debit_balance,
            credit_balance: item.credit_balance
        });
    }
    return data;
};