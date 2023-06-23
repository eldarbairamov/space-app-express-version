import { scrollToElement } from "@src/helper";
import { AuthorizedRouter, AuthorizedRoutesEnum } from "@src/router";

import style from './Auth-Settings.module.scss'

export function AuthSettings() {
   return (
      <div className={ style.AuthSettings }>
         <p onClick={ () => {
            scrollToElement();
            AuthorizedRouter.navigate(AuthorizedRoutesEnum.PasswordSettings);
         } }>
            Змінити пароль
         </p>

         <p onClick={ () => {
            scrollToElement();
            AuthorizedRouter.navigate(AuthorizedRoutesEnum.EmailSettings);
         } }>
            Змінити електронну пошту
         </p>
      </div>
   )
}
