import Joi from "joi";

const cashBankRVoucherSchema = Joi.object({
  id: Joi.number().required(),
});

export const cashBankRVoucherApproveSchema = Joi.object({
  checked_by_id: Joi.number().required(),
  checked_by_print_name: Joi.string().required(),
  ulb_id: Joi.number().required(),
  date: Joi.string().required(),
  ids: Joi.array().required().items(cashBankRVoucherSchema),
});
