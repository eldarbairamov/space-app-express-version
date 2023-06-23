import { userActions } from "@src/redux/slice";
import { useAppDispatch } from "@src/hook";
import { IUpdateProfile, IUser } from "@src/interface";
import { axiosInstance } from "@src/service";
import { userRequests } from "@src/config/configuration";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function updateProfileService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const updateProfileFn = async (body: IUpdateProfile) => {
      try {
         message.loading("Лоудінг...");
         const { data } = await axiosInstance.patch<IUser>(userRequests.profileUpdate, body);
         dispatch(userActions.setInfo(data));
         message.destroy();
         message.success("Ви успішно оновили профіль");

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { updateProfileFn };

}
