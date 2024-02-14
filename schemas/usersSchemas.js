import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(6).max(20).required().messages({
    "string.min": "Password must be not less than 6 symbols",
    "any.required": "Password must be not less than 6 symbols",
  }),
  subscription: Joi.string().valid("starter", "pro", "business").messages({
    "any.only":
      "Subscription can be chosen from only three values: starter, pro, business",
  }),
});

export const changeSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.required": "Subscription is required",
      "any.only":
        "Subscription can be chosen from only three values: starter, pro, business",
    }),
});
