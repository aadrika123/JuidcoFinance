import Joi from "joi";
import { Request } from "express";

export interface RevisedBudgetsRequestData {
  primary_acc_code_id: number;
  approved_amount: number;
  revised_amount: number;
  remarks: string;
}

const revisedBudgetsSchema = Joi.object({
  primary_acc_code_id: Joi.number().required(),
  approved_amount: Joi.number().required(),
  revised_amount: Joi.number().required(),
  remarks: Joi.string().required(),
});

export const revisedBudgetsValidation = Joi.array().items(revisedBudgetsSchema);
export const revisedBudgetsValidationWithID = revisedBudgetsSchema.keys({
  id: Joi.number().required(),
});
export const requestData = (req: Request): RevisedBudgetsRequestData => {
  return {
    primary_acc_code_id: req.body.data.primary_acc_code_id,
    approved_amount: req.body.data.approved_amount,
    revised_amount: req.body.data.revised_amount,
    remarks: req.body.data.remarks,
  };
};
export const multiRequestData = (req: Request): RevisedBudgetsRequestData[] => {
  const data = [];
  for (const item of req.body.data) {
    data.push({
      primary_acc_code_id: item.primary_acc_code_id,
      approved_amount: item.approved_amount,
      revised_amount: item.revised_amount,
      remarks: item.remarks,
    });
  }
  return data;
};
