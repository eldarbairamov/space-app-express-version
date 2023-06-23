import { axiosInstance } from "@src/service";
import { IRegistration } from "@src/interface";
import { authRequests } from "@src/config/configuration";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function registrationService(next: () => any) {
   const { message } = App.useApp();

   const registrationFn = async (body: IRegistration) => {
      try {
         message.loading("Лоудінг...");
         await axiosInstance.post(authRequests.registration, body);
         message.destroy()

         next();

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { registrationFn };
}
