import { IMoment } from "@src/interface";
import { axiosInstance } from "@src/service";
import { momentsRequests } from "@src/config/configuration";
import { momentActions } from "@src/redux/slice";
import { App } from "antd";
import { useAppDispatch } from "@src/hook";
import { TypedOnChange } from "@src/interface/common.interface";
import { errorCatherFn } from "@src/helper";

export function uploadMomentPhotoService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const uploadPhotoFn = async (event: TypedOnChange, momentId: IMoment["id"]) => {
      try {
         message.loading("Лоудінг...");
         const image = (event.target.files as FileList)[0];
         const formData = new FormData();
         formData.append("photo", image);
         const { data } = await axiosInstance.patch<{ image: string }>(momentsRequests.uploadPhoto + momentId + "/photo_upload", formData);
         dispatch(momentActions.setPhoto({ photo: data.image }));
         message.destroy()

      } catch (e) {
         message.destroy()
         message.error(errorCatherFn(e));
      }
   };

   return { uploadPhotoFn };
}
