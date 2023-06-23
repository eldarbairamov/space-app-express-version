import Joi from "joi";
import { EMAIL_REGEXP, ONLY_LETTERS_REGEXP } from "@src/constant";
import { IChangePassword, IResetPassword, IUpdateProfile } from "@src/interface";

export const updateProfileValidator = Joi.object<IUpdateProfile>({

   username: Joi.string().trim().messages({
      "string.base": "username: value must be a string",
   }),

   name: Joi.string().pattern(ONLY_LETTERS_REGEXP).trim().optional().allow(null, "").messages({
      "string.base": "name: value must be a string",
      "string.pattern.base": "name: value must contain only letters",
   }),

   surname: Joi.string().pattern(ONLY_LETTERS_REGEXP).trim().optional().allow(null, "").messages({
      "string.base": "surname: value must be a string",
      "string.pattern.base": "surname: value must contain only letters",
   }),

});

export const emailValidator = Joi.object<{ email: string }>({

   email: Joi.string().pattern(EMAIL_REGEXP).required().trim().messages({
      "string.pattern.base": "email: value must be an email",
      "string.empty": "email: field is required and cannot be empty",
      "any.required": "email: field is required and cannot be empty",
   }),

});

export const changePasswordValidator = Joi.object<IChangePassword>({

   newPassword: Joi.string().min(6).max(20).required().trim().messages({
      "string.base": "password: value must be a string",
      "string.max": "password: value must be less than 20",
      "string.min": "password: value must be greater than 6",
      "string.empty": "password: field is required and cannot be empty",
      "any.required": "password: field is required and cannot be empty",
   }),

   currentPassword: Joi.string().min(6).max(20).required().trim().messages({
      "string.base": "password: value must be a string",
      "string.max": "password: value must be less than 20",
      "string.min": "password: value must be greater than 6",
      "string.empty": "password: field is required and cannot be empty",
      "any.required": "password: field is required and cannot be empty",
   }),

});

export const resetPasswordValidator = Joi.object<IResetPassword>({

   resetPasswordToken: Joi.string().required().trim().messages({
      "string.empty": "fileName: field is required and cannot be empty",
      "any.required": "fileName: field is required and cannot be empty",
   }),

   password: Joi.string().min(6).max(20).required().trim().messages({
      "string.base": "password: value must be a string",
      "string.max": "password: value must be less than 20",
      "string.min": "password: value must be greater than 6",
      "string.empty": "password: field is required and cannot be empty",
      "any.required": "password: field is required and cannot be empty",
   }),

});

export const fileNameValidator = Joi.object<{ fileName: string }>({

   fileName: Joi.string().required().trim().messages({
      "string.empty": "fileName: field is required and cannot be empty",
      "any.required": "fileName: field is required and cannot be empty",
   }),

});

export const changeEmailValidator = Joi.object<{ confirmationToken: string }>({

   confirmationToken: Joi.string().required().trim().messages({
      "string.empty": "fileName: field is required and cannot be empty",
      "any.required": "fileName: field is required and cannot be empty",
   }),

});