import Joi from "joi";
import { Request } from "express";

export interface GrantEntriesRequestData {
  ulb_id: number;
  primary_acc_code_id: number;
  grant_id: number;
  sanction_number: string;
  grant_nature_id: number;
  grant_from_date: Date;
  grant_to_date: Date;
  sanctioned_amount: number;
  advance_rcving_date: Date;
  advance_amount: number;
  expenditure_date: Date;
  voucher_id: number;
  expndtre_nature_id: number;
  blnce_trckng_id: number;
  refund_date: Date;
  refund_amount: number;
  user_id: number;
  signature: string;
}

const grantEntriesSchema = Joi.object({
  ulb_id: Joi.number().required(),
  primary_acc_code_id: Joi.number().required(),
  grant_id: Joi.number().required(),
  sanction_number: Joi.string().required(),
  grant_nature_id: Joi.number().required(),
  grant_from_date: Joi.date().required(),
  grant_to_date: Joi.date().required(),
  sanctioned_amount: Joi.number().required(),
  advance_rcving_date: Joi.date().required(),
  advance_amount: Joi.number().required(),
  expenditure_date: Joi.date().required(),
  voucher_id: Joi.number().required(),
  expndtre_nature_id: Joi.number().required(),
  blnce_trckng_id: Joi.number().required(),
  refund_date: Joi.date().required(),
  refund_amount: Joi.number().required(),
 user_id: Joi.number().required(),
  signature: Joi.string().required(),
});

export const grantEntriesValidation = Joi.array().items(grantEntriesSchema);
export const grantEntriesValidationWithID = grantEntriesSchema.keys({
  id: Joi.number().required(),
});
export const requestData = (req: Request): GrantEntriesRequestData => {
  return {
    ulb_id: req.body.data.ulb_id,
    primary_acc_code_id: req.body.data.primary_acc_code_id,
    grant_id: req.body.data.grant_id,
    sanction_number: req.body.data.sanction_number,
    grant_nature_id: req.body.data.grant_nature_id,
    grant_from_date: req.body.data.grant_from_date,
    grant_to_date: req.body.data.grant_to_date,
    sanctioned_amount: req.body.data.sanctioned_amount,
    advance_rcving_date: req.body.data.advance_rcving_date,
    advance_amount: req.body.data.advance_amount,
    expenditure_date: req.body.data.expenditure_date,
    voucher_id: req.body.data.voucher_id,
    expndtre_nature_id: req.body.data.expndtre_nature_id,
    blnce_trckng_id: req.body.data.blnce_trckng_id,
    refund_date: req.body.data.refund_date,
    refund_amount: req.body.data.refund_amount,
    user_id: req.body.data.user_id,
    signature: req.body.data.signature,
  };
};
export const multiRequestData = (req: Request): GrantEntriesRequestData[] => {
  const data = [];
  for (const item of req.body.data) {
    data.push({
      ulb_id: item.ulb_id,
      primary_acc_code_id: item.primary_acc_code_id,
      grant_id: item.grant_id,
      sanction_number: item.sanction_number,
      grant_nature_id: item.grant_nature_id,
      grant_from_date: item.grant_from_date,
      grant_to_date: item.grant_to_date,
      sanctioned_amount: item.sanctioned_amount,
      advance_rcving_date: item.advance_rcving_date,
      advance_amount: item.advance_amount,
      expenditure_date: item.expenditure_date,
      voucher_id: item.voucher_id,
      expndtre_nature_id: item.expndtre_nature_id,
      blnce_trckng_id: item.blnce_trckng_id,
      refund_date: item.refund_date,
      refund_amount: item.refund_amount,
      user_id: item.user_id,
      signature: item.signature,
    });
  }
  return data;
};
