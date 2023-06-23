import { axiosInstance } from "@src/service";
import { IPlan, IPlans } from "@src/interface";
import { plansRequests } from "@src/config/configuration";
import { planAction } from "@src/redux/slice";
import { App } from "antd";
import { useAppDispatch } from "@src/hook";
import { errorCatherFn } from "@src/helper";

export function deletePlanService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const deletePlanFn = async (targetId: IPlan["id"], total = 30, searchKey = "") => {
      try {
         message.loading("Лоудінг...");
         const { data } = await axiosInstance.delete<IPlans>(plansRequests.deletePlan + targetId, {
            params: {
               searchKey,
               limit: total,
            },
         });
         dispatch(planAction.deletePlan(targetId));
         dispatch(planAction.setPlans(data));
         message.destroy();

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   return { deletePlanFn };
}
