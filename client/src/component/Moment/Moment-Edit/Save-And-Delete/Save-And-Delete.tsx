import { deleteMomentService, updateMomentService } from "@src/service";
import { AuthorizedRouter, AuthorizedRoutesEnum } from "@src/router";
import { IMoment } from "@src/interface";
import { TypedSetState } from "@src/interface/common.interface";

import style from './Save-And-Delete.module.scss'

interface ISaveAndDeleteProps {
   momentId: string,
   activeMoment: IMoment,
   setPrevState: TypedSetState<IMoment>
   prevState: IMoment
}

export function SaveAndDelete({ momentId, activeMoment, setPrevState, prevState }: ISaveAndDeleteProps) {
   const { updateMomentFn } = updateMomentService(setPrevState);
   const { deleteMomentFn } = deleteMomentService(() => AuthorizedRouter.navigate(AuthorizedRoutesEnum.MomentsPage));

   return (
      <div className={ style.SaveAndDelete }>
         <p className={ style.delete_moment }
            onClick={ () => deleteMomentFn(momentId!) }>
            Видалити
         </p>

         { (prevState !== activeMoment) &&
            <p className={ style.save_moment }
               onClick={ () => updateMomentFn(activeMoment!) }>
               Зберегти
            </p>
         }
      </div>
   )
}
