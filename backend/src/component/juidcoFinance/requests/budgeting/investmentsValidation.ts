import Joi from "joi";
import { Request } from "express";

export interface InvestmentsRequestData {
  ulb_id: number;
  primary_acc_code_id: number;
  investment_no: string;
  authorization_date: Date;
  investment_date: Date;
  particulars: string;
  investment_type_id: number;
  purchase_amount: number;
  face_value_amount: number;
  interest_due_date: Date;
  interest_due_amount: number;
  user_id: number;
  interest_recovered_amount: number;
  interest_recovery_date: Date;
  acc_adj_recovery_date: Date;
  realization_final_amount: number;
  realization_date: Date;
  acc_adj_realization_date: Date;
  remarks: string;
}

const investmentsSchema = Joi.object({
  ulb_id: Joi.number().required(),
  primary_acc_code_id: Joi.number().required(),
  investment_no: Joi.string().required(),
  authorization_date: Joi.date().required(),
  investment_date: Joi.date().required(),
  particulars: Joi.string().required(),
  investment_type_id: Joi.number().required(),
  purchase_amount: Joi.number().required(),
  face_value_amount: Joi.number().required(),
  interest_due_date: Joi.date().required(),
  interest_due_amount: Joi.number().required(),
  user_id: Joi.number().required(),
  interest_recovered_amount: Joi.number().required(),
  interest_recovery_date: Joi.date().required(),
  acc_adj_recovery_date: Joi.date().required(),
  realization_final_amount: Joi.number().required(),
  realization_date: Joi.date().required(),
  acc_adj_realization_date: Joi.date().required(),
  remarks: Joi.string().required(),
});

export const investmentsValidation = Joi.array().items(investmentsSchema);
export const investmentsValidationWithID = investmentsSchema.keys({
  id: Joi.number().required(),
});
export const requestData = (req: Request): InvestmentsRequestData => {
  return {
    ulb_id: req.body.data.ulb_id,
    primary_acc_code_id: req.body.data.primary_acc_code_id,
    investment_no: req.body.data.investment_no,
    authorization_date: req.body.data.authorization_date,
    investment_date: req.body.data.investment_date,
    particulars: req.body.data.particulars,
    investment_type_id: req.body.data.investment_type_id,
    purchase_amount: req.body.data.purchase_amount,
    face_value_amount: req.body.data.face_value_amount,
    interest_due_date: req.body.data.interest_due_date,
    interest_due_amount: req.body.data.interest_due_amount,
    user_id: req.body.data.user_id,
    interest_recovered_amount: req.body.data.interest_recovered_amount,
    interest_recovery_date: req.body.data.interest_recovery_date,
    acc_adj_recovery_date: req.body.data.acc_adj_recovery_date,
    realization_final_amount: req.body.data.realization_final_amount,
    realization_date: req.body.data.realization_date,
    acc_adj_realization_date: req.body.data.acc_adj_realization_date,
    remarks: req.body.data.remarks,
  };
};
export const multiRequestData = (req: Request): InvestmentsRequestData[] => {
  const data = [];
  for (const item of req.body.data) {
    data.push({
      ulb_id: item.ulb_id,
      primary_acc_code_id: item.primary_acc_code_id,
      investment_no: item.investment_no,
      authorization_date: item.authorization_date,
      investment_date: item.investment_date,
      particulars: item.particulars,
      investment_type_id: item.investment_type_id,
      purchase_amount: item.purchase_amount,
      face_value_amount: item.face_value_amount,
      interest_due_date: item.interest_due_date,
      interest_due_amount: item.interest_due_amount,
      user_id: item.user_id,
      interest_recovered_amount: item.interest_recovered_amount,
      interest_recovery_date: item.interest_recovery_date,
      acc_adj_recovery_date: item.acc_adj_recovery_date,
      realization_final_amount: item.realization_final_amount,
      realization_date: item.realization_date,
      acc_adj_realization_date: item.acc_adj_realization_date,
      remarks: item.remarks,
    });
  }
  return data;
};
