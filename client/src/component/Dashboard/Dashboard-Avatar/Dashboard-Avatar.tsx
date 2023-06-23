import { useAppSelector } from "@src/hook";
import { configuration } from "@src/config/configuration";

import user from "/user.png";
import style from "./Dashboard-Avatar.module.scss";

export function DashboardAvatar() {
   const { avatar } = useAppSelector(state => state.userReducer);

   return (
      <div className={ style.DashboardAvatar }>

         <div className={ avatar ? style.avatar : undefined }>
            <img src={ avatar ? `${ configuration.API_URL }/${ avatar }` : user }
                 alt={ avatar ? "avatar" : 'user' }
                 className={ !avatar ? style.no_avatar : undefined }/>
         </div>

      </div>
   );
}
