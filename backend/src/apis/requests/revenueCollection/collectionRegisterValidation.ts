import Joi from "joi";

const collectionRegisterIdsSchema = Joi.object({
  id: Joi.number().required(),
});

export const collectionRegisterApproveSchema = Joi.object({
  checked_by_id: Joi.number().required(),
  checked_by_print_name: Joi.string().required(),
  ids: Joi.array().required().items(collectionRegisterIdsSchema),
});
