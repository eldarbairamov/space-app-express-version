import { CHANGE_EMAIL, FORGOT_PASSWORD, REGISTRATION } from "@src/constant";

export const emailTemplate = {
   [REGISTRATION]: {
      subject: "Ласкаво просимо на борт",
      templateName: "registration",
   },
   [FORGOT_PASSWORD]: {
      subject: "Забули пароль?",
      templateName: "forgot-password",
   },
   [CHANGE_EMAIL]: {
      subject: "Зміна електронної пошти",
      templateName: "change-email",
   },
};

