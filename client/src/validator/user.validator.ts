import Joi from "joi";
import { onlyLettersRegex } from "@src/constant";
import { IUpdateProfileForm } from "@src/interface";

export const updateProfile = Joi.object<IUpdateProfileForm>({

   username: Joi.string().trim().min(2).max(15).required().messages({
      "string.empty": "Поле неповинно залишитись пустим",
      "string.max": "Не більше 15-и символів",
      "string.min": "Не менше 2-х символів",
   }),

   name: Joi.string().pattern(onlyLettersRegex).trim().min(2).max(15).optional().allow(null, "").messages({
      "string.pattern.base": "Недопустимий формат. Тільки букви",
      "string.max": "Не більше 15-и символів",
      "string.min": "Не менше 2-х символів",
   }),

   surname: Joi.string().pattern(onlyLettersRegex).trim().min(2).max(15).optional().allow(null, "").messages({
      "string.pattern.base": "Недопустимий формат. Тільки букви",
      "string.max": "Не більше 15-и символів",
      "string.min": "Не менше 2-х символів",
   }),

});
