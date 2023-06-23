import Joi from "joi";
import { IUpdateNote } from "@src/interface";

export const updateNoteValidator = Joi.object<IUpdateNote>({

   title: Joi.string().allow("").messages({
      "string.base": "title: value must be a string",
   }),

   body: Joi.string().allow("").messages({
      "string.base": "body: value must be a string",
   }),

});
