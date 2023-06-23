import { useEffect } from "react";

import { userActions } from "@src/redux/slice";
import { userRequests } from "@src/config/configuration";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { axiosInstance } from "@src/service";
import { IUser } from "@src/interface";
import { App } from "antd";
import { errorCatherFn, pleaseWait } from "@src/helper";
import { delay } from "@src/constant";

export function getUserService() {
   const { isLoading } = useAppSelector(state => state.userReducer);

   const dispatch = useAppDispatch();

   const { message } = App.useApp();

   const getUserFn = async () => {
      try {
         dispatch(userActions.setIsLoading(true));
         const { data } = await axiosInstance.get<IUser>(userRequests.getUser);
         await pleaseWait(delay);
         dispatch(userActions.setInfo(data));

      } catch (e) {
         dispatch(userActions.setIsLoading(false));
         message.error(errorCatherFn(e));

      } finally {
         dispatch(userActions.setIsLoading(false));
      }
   };

   useEffect(() => {
      getUserFn();
   }, []);

   return { getUserFn, isLoading };
}
