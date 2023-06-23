import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "node:path";
import { configuration } from "@src/config";
import { emailTemplate } from "@src/email-template/email-template";
import { EmailActionType } from "@src/type/email-action.type";
import { EMAIL_TEMPLATES_PATH } from "@src/constant/email-templates-path.constant";
import { ApiException } from "@src/exception/api.exception";

export const emailSender = async (to: string, emailAction: EmailActionType, context: any) => {
   const template = emailTemplate[emailAction];

   const transporter = nodemailer.createTransport({
      service: "gmail",
      from: "no reply",
      auth: {
         user: configuration.EMAIL_SERVICE_USER,
         pass: configuration.EMAIL_SERVICE_PASS,
      },
   });

   transporter.use("compile", hbs({
      viewEngine: {
         defaultLayout: "main",
         layoutsDir: path.join(EMAIL_TEMPLATES_PATH, "layout"),
         partialsDir: path.join(EMAIL_TEMPLATES_PATH, "partial"),
         extname: ".hbs",
      },
      extName: ".hbs",
      viewPath: path.join(EMAIL_TEMPLATES_PATH, "view"),
   }));

   const mail = {
      to,
      subject: template.subject,
      template: template.templateName,
      context,
   };

   return transporter
      .sendMail(mail)
      .catch((e) => {
         const error = e as Error;
         console.log(error.message);
         throw new ApiException("Nodemailer: Error", 500);
      });
};