import { userRequests } from "@src/config/configuration";
import { axiosInstance } from "@src/service";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function changeEmailService(next: () => any) {
   const { message } = App.useApp();

   const changeEmailFn = async (email: string) => {
      try {
         message.loading("Лоудінг...");
         await axiosInstance.post(userRequests.changeEmail, { email });
         message.destroy();

         next();

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { changeEmailFn };

}
