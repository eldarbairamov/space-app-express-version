import { axiosInstance } from "@src/service";
import { IPlan } from "@src/interface";
import { plansRequests } from "@src/config/configuration";
import { useAppDispatch } from "@src/hook";
import { planAction } from "@src/redux/slice";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function addPlanService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const addPlanFn = async () => {
      try {
         message.loading("Лоудінг...");
         const { data } = await axiosInstance.post<IPlan>(plansRequests.addPlan);
         dispatch(planAction.setSearchKey(""));
         dispatch(planAction.addPlan(data));
         message.destroy();

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { addPlanFn };
}
