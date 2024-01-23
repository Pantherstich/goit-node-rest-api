import Joi from "joi";

const createContactSchema = Joi.object({
  name: Joi.string().required(),

  email: Joi.string().email().required(),

  phone: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),

  email: Joi.string(),

  phone: Joi.string(),
});
