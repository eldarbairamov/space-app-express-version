import Joi from "joi";

export const updatePlanValidator = Joi.object<{ title: string }>({

   title: Joi.string().allow("").messages({
      "string.base": "title: value must be a string",
   }),

});
