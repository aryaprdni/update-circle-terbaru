import * as Joi from "joi";

const registerValidation = Joi.object({
  full_name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const updateValidation = Joi.object({
  id: Joi.number().required(),
  username: Joi.string().max(100).allow(null),
  full_name: Joi.string().max(100).allow(null),
  bio: Joi.string().max(100).allow(null),
  // email: Joi.string().max(100).allow(null),
  // password: Joi.string().min(4).max(100).allow(null),
  profile_description: Joi.string().allow(null),
  profile_picture: Joi.string().allow(null),
});

const loginValidation = Joi.object({
  username: Joi.string().max(100).allow(null),
  password: Joi.string().max(100).required(),
});

export { updateValidation, loginValidation, registerValidation };
