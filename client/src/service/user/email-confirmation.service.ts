import { useEffect, useState } from "react";

import { userRequests } from "@src/config/configuration";
import { axiosInstance } from "@src/service";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function emailConfirmationService(token: string) {
   const [ isSuccess, setIsSuccess ] = useState<boolean>(false);
   const [ errorMessage, setErrorMessage ] = useState<string>("");
   const { message } = App.useApp();

   const confirmEmailFn = async () => {
      try {
         message.loading("Лоудінг...");
         await axiosInstance.patch(userRequests.changeEmailAccept, { confirmationToken: token });
         setIsSuccess(true);
         message.destroy();

      } catch (e) {
         message.destroy();
         setErrorMessage(errorCatherFn(e));
         setIsSuccess(false);
      }
   };

   useEffect(() => {
      confirmEmailFn();
   }, []);

   return { isSuccess, errorMessage };
}
