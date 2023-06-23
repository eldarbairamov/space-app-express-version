import { configuration } from "@src/config/configuration";
import { useAppSelector } from "@src/hook";

import style from './User-Photo.module.scss'
import user from "/user.png";

export function UserPhoto() {
   const { avatar } = useAppSelector(state => state.userReducer);

   return (
      <>
         { avatar &&
            <div className={ style.UserPhoto }>
               <img src={ `${ configuration.API_URL }/${ avatar }` }
                    alt="avatar"/>
            </div>
         }

         { !avatar && <img className={ style.no_photo }
                           src={ user }
                           alt="no avatar"/> }
      </>
   )
}
