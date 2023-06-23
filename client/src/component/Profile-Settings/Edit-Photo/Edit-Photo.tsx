import { ChangeEvent, useRef } from "react";

import { deletePhotoService, uploadPhotoService } from "@src/service";
import { useAppSelector } from "@src/hook";

import style from './Edit-Photo.module.scss'

export function EditPhoto () {
   const { avatar } = useAppSelector(state => state.userReducer);

   const filePicker = useRef<HTMLInputElement>(null);
   const handlePick = () => filePicker.current!.click();

   const { deletePhotoFn } = deletePhotoService();
   const { uploadPhotoFn } = uploadPhotoService();

   const uploadPhoto = async (event: ChangeEvent<HTMLInputElement>) => uploadPhotoFn((event.target.files as FileList)[0]);

   return (
      <div className={ style.EditPhoto }>
         <p onClick={ handlePick }> Змінити фото </p>
         { !!avatar && <p> | </p> }
         { !!avatar && <p onClick={ () => deletePhotoFn(avatar) }> Видалити </p> }
         <input ref={ filePicker }
                type={ "file" }
                onChange={ uploadPhoto }/>
      </div>
   )
}
