import Joi from "joi";
import { IAddTask } from "@src/interface";

export const updateTaskValidator = Joi.object<{ isCompleted: boolean }>({

   isCompleted: Joi.boolean().required().messages({
      "any.required": "isCompleted: field is required and cannot be empty",
      "boolean.base": "isCompleted: value must be a boolean",
   }),

});

export const addTaskValidator = Joi.object<IAddTask>({

   title: Joi.string().required().messages({
      "any.required": "title: field is required and cannot be empty",
      "string.base": "title: value must be a string",
   }),

   planId: Joi.string().required().messages({
      "any.required": "planId: field is required and cannot be empty",
      "string.base": "planId: value must be a string",
   }),

});