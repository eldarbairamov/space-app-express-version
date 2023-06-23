import { IMoment } from "@src/interface";
import { axiosInstance } from "@src/service";
import { momentsRequests } from "@src/config/configuration";
import { momentActions } from "@src/redux/slice";
import { useAppDispatch } from "@src/hook";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function addMomentService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const addMomentFn = async () => {
      try {
         message.loading("Лоудінг...");
         const { data } = await axiosInstance.post<IMoment>(momentsRequests.addMoment);
         dispatch(momentActions.addMoment(data));
         message.destroy();

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { addMomentFn };
}
