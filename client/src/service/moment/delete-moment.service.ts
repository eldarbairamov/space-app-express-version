import { axiosInstance } from "@src/service";
import { momentsRequests } from "@src/config/configuration";
import { IMoment } from "@src/interface";
import { momentActions } from "@src/redux/slice";
import { useAppDispatch } from "@src/hook";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function deleteMomentService(next: () => void) {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const deleteMomentFn = async (momentId: IMoment["id"]) => {
      try {
         message.loading("Лоудінг...");
         await axiosInstance.delete(momentsRequests.deleteMoment + momentId);
         dispatch(momentActions.deleteMoment({ momentId: momentId! }));
         message.destroy();

         next();

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   return { deleteMomentFn };
}
