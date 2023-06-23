import React, { useRef } from "react";

import { configuration } from "@src/config/configuration";
import { IMoment } from "@src/interface";
import { uploadMomentPhotoService } from "@src/service";
import { useAppSelector } from "@src/hook";

import style from './Photo.module.scss'
import noImageLight from "/no-image-light.svg";
import noImageDark from "/no-image-dark.svg";

interface IPhotoProps {
   momentId: string
   activeMoment: IMoment,
}

export function Photo({ momentId, activeMoment }: IPhotoProps) {
   const { isDark } = useAppSelector(state => state.appReducer);

   const filePicker = useRef<HTMLInputElement>(null);
   const handlePick = () => filePicker.current!.click();

   const { uploadPhotoFn } = uploadMomentPhotoService();

   return (
      <div className={ style.Photo }>
         <input className={ style.upload_photo }
                type={ "file" }
                ref={ filePicker }
                onChange={ event => uploadPhotoFn(event, momentId!) }/>

         { activeMoment.photo
            ?
            <>
               <img className={ style.photo_background }
                    src={ `${ configuration.API_URL }/${ activeMoment.photo }` }
                    alt={ "background" }/>

               <img onClick={ handlePick }
                    className={ style.photo_exist }
                    src={ `${ configuration.API_URL }/${ activeMoment.photo }` }
                    alt={ "photo" }/>
            </>
            :
            <img onClick={ handlePick }
                 className={ style.no_photo }
                 src={ isDark ? noImageLight : noImageDark }
                 alt={ "no_image" }/>
         }
      </div>
   )
}
