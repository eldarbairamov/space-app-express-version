import { useEffect, useState } from "react";

import { IPlan } from "@src/interface";
import { axiosInstance } from "@src/service";
import { plansRequests } from "@src/config/configuration";
import { useAppDispatch } from "@src/hook";
import { planAction } from "@src/redux/slice";
import { App } from "antd";
import { errorCatherFn, pleaseWait } from "@src/helper";
import { delay } from "@src/constant";

export function getOnePlanService(planId: IPlan["id"]) {
   const [ planTitle, setPlanTitle ] = useState<string>("");
   const { message } = App.useApp();

   const dispatch = useAppDispatch();

   const getOnePlan = async () => {
      try {
         dispatch(planAction.setActivePlan({} as IPlan));
         const { data } = await axiosInstance.get<IPlan>(plansRequests.getOnePlan + planId);
         await pleaseWait(delay);
         dispatch(planAction.setActivePlan(data));

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getOnePlan();
   }, []);

   return { planTitle, setPlanTitle };

}
