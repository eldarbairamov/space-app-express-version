import { useEffect, useState } from "react";

import { IMoment } from "@src/interface";
import { axiosInstance } from "@src/service";
import { momentsRequests } from "@src/config/configuration";
import { momentActions } from "@src/redux/slice";
import { App } from "antd";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { errorCatherFn, pleaseWait } from "@src/helper";
import { delay } from "@src/constant";

export function getMomentService(momentId: IMoment["id"]) {
   const { isLoading, activeMoment } = useAppSelector(state => state.momentReducer);

   const [ prevState, setPrevState ] = useState<IMoment>({} as IMoment);

   const { message } = App.useApp();

   const dispatch = useAppDispatch();

   const getMomentFn = async () => {
      try {
         dispatch(momentActions.setIsLoading(true));
         const { data } = await axiosInstance.get<IMoment>(momentsRequests.getOneMoment + momentId);
         await pleaseWait(delay);
         dispatch(momentActions.setActiveMoment(data));
         setPrevState(data);

      } catch (e) {
         dispatch(momentActions.setIsLoading(false));
         message.error(errorCatherFn(e));

      } finally {
         dispatch(momentActions.setIsLoading(false));
      }
   };

   useEffect(() => {
      getMomentFn();
   }, []);


   return { prevState, setPrevState, isLoading, activeMoment };
}
