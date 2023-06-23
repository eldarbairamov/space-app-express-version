import { axiosInstance } from "@src/service";
import { userRequests } from "@src/config/configuration";
import { userActions } from "@src/redux/slice";
import { useAppDispatch } from "@src/hook";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function uploadPhotoService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const uploadPhotoFn = async (image: File) => {
      try {
         message.loading("Лоудінг...");
         const formData = new FormData();
         formData.append("avatar", image);

         const { data } = await axiosInstance.patch<{ image: string }>(userRequests.uploadAvatar, formData);
         dispatch(userActions.setAvatar(data.image));
         message.destroy();

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { uploadPhotoFn };

}
