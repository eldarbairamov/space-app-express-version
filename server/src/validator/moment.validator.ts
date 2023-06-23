import Joi from "joi";
import { IUpdateMoment } from "@src/interface";

export const updateMomentValidator = Joi.object<IUpdateMoment>({

   title: Joi.string().messages({
      "string.base": "title: value must be a string",
      "string.empty": "title: is not allowed to be empty",
   }),

   location: Joi.string().messages({
      "string.base": "location: value must be a string",
      "string.empty": "location: is not allowed to be empty",
   }),

   date: Joi.number().messages({
      "number.base": "date: value must be a number",
      "number.empty": "date: is not allowed to be empty",
   }),

   tag: Joi.string().messages({
      "string.base": "tag: value must be a string",
      "string.empty": "tag: is not allowed to be empty",
   }),

});
