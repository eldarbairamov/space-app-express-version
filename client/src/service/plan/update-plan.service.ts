import { IPlan } from "@src/interface";
import { axiosInstance } from "@src/service";
import { plansRequests } from "@src/config/configuration";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function updatePlanService() {
   const { message } = App.useApp();

   const updatePlanFn = async (planId: IPlan["id"], title: IPlan["title"]): Promise<void> => {
      try {
         await axiosInstance.put(plansRequests.updatePlan + planId, { title });

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   return { updatePlanFn };

}