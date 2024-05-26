import Joi from "joi";
import { emailRegexp, phoneRegexp } from "../constants/contacts-constants.js";

export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

export const contactToggleFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
