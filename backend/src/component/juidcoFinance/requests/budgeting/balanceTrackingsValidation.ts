import Joi from "joi";
import { Request } from "express";

export interface BalanceTrackingsRequestData {
primary_acc_code_id: number,
balance_amount: number,
}

const balanceTrackingsSchema = Joi.object ({
primary_acc_code_id: Joi.number().required(),
balance_amount: Joi.number().required(),
})

export const balanceTrackingsValidation = Joi.array().items(
balanceTrackingsSchema
);
export const balanceTrackingsValidationWithID = balanceTrackingsSchema.keys({
id: Joi.number().required(),
});
export const requestData = (req: Request): BalanceTrackingsRequestData => {
return {
primary_acc_code_id: req.body.primary_acc_code_id,
balance_amount: req.body.balance_amount,
};
};
export const multiRequestData = (req: Request): BalanceTrackingsRequestData [] => {
const data = [];
for(const item of req.body) {
data.push({
primary_acc_code_id: item.primary_acc_code_id,
balance_amount: item.balance_amount,
});
}
return data;
};