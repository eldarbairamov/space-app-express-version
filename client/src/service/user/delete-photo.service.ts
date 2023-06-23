import { IUser } from "@src/interface";
import { useAppDispatch } from "@src/hook";
import { axiosInstance } from "@src/service";
import { userRequests } from "@src/config/configuration";
import { userActions } from "@src/redux/slice";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function deletePhotoService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const deletePhotoFn = async (avatar: IUser["avatar"]) => {
      try {
         message.loading("Лоудінг...");
         await axiosInstance.patch(userRequests.deleteAvatar, { fileName: avatar });
         dispatch(userActions.unsetAvatar());
         message.destroy();

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { deletePhotoFn };

}
