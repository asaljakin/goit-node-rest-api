import Joi from "joi";
import { SUBSCRIPTIONS, emailRegexp } from "../constants/contacts-constants.js";

export const userRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid(...SUBSCRIPTIONS),
  token: Joi.string(),
});

export const userLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

export const userSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...SUBSCRIPTIONS)
    .required(),
});
