import { axiosInstance } from "@src/service";
import { authRequests } from "@src/config/configuration";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function forgotPasswordService(next: () => any) {
   const { message } = App.useApp();

   const forgotPasswordFn = async (email: string) => {
      try {
         message.loading("Лоудінг...");
         await axiosInstance.post<{ message: string }>(authRequests.forgotPassword, { email });
         message.destroy();

         next();

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { forgotPasswordFn };
}
