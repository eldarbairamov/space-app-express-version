import { axiosInstance } from "@src/service";
import { userRequests } from "@src/config/configuration";
import { App } from "antd";
import { errorCatherFn, pleaseWait } from "@src/helper";

export function changePasswordService(next: () => any) {
   const { message } = App.useApp();

   const updatePasswordFn = async (newPassword: string, currentPassword: string) => {
      try {
         message.loading("Лоудінг...");
         await axiosInstance.patch(userRequests.changePassword, { newPassword, currentPassword });
         await pleaseWait(1000);
         message.destroy();

         next();

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { updatePasswordFn };

}
