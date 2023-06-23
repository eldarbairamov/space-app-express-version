import { axiosInstance } from "@src/service";
import { authRequests } from "@src/config/configuration";
import { App } from "antd";
import { errorCatherFn, pleaseWait } from "@src/helper";

export function resetPasswordService(next: () => any) {
   const { message } = App.useApp();

   const resetPasswordFn = async (password: string, token: string) => {
      try {
         message.loading("Лоудінг...");
         await axiosInstance.patch(authRequests.resetPassword, { resetPasswordToken: token, password });
         message.destroy();
         message.success("Вітаємо! У вас новий пароль");
         await pleaseWait(2000);

         next();

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { resetPasswordFn };
}
