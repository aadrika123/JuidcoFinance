import Joi from "joi";
import { Request } from "express";

export interface ReceiptBudgetsRequestData {
  fin_year_id: number;
  primary_acc_code_id: number;
  amount: number;
}

const receiptBudgetsSchema = Joi.object({
  fin_year_id: Joi.number().required(),
  primary_acc_code_id: Joi.number().required(),
  amount: Joi.number().required(),
});

export const receiptBudgetsValidation = Joi.array().items(receiptBudgetsSchema);
export const receiptBudgetsValidationWithID = receiptBudgetsSchema.keys({
  id: Joi.number().required(),
});
export const requestData = (req: Request): ReceiptBudgetsRequestData => {
  return {
    fin_year_id: req.body.fin_year_id,
    primary_acc_code_id: req.body.primary_acc_code_id,
    amount: req.body.amount,
  };
};
export const multiRequestData = (req: Request): ReceiptBudgetsRequestData[] => {
  const data = [];
  for (const item of req.body) {
    data.push({
      fin_year_id: item.fin_year_id,
      primary_acc_code_id: item.primary_acc_code_id,
      amount: item.amount,
    });
  }
  return data;
};
