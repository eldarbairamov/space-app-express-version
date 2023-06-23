import { UnauthorizedRouter, UnauthorizedRoutesEnum } from "@src/router";

import style from "./Welcome-Logo.module.scss";

export function WelcomeLogo() {
   return (
      <div className={ style.WelcomeLogo }
           onClick={ () => UnauthorizedRouter.navigate(UnauthorizedRoutesEnum.LoginPage) }>
         <p className={ style.first }> [ </p>
         <p className={ style.second }> спейс </p>
         <p className={ style.third }> ] </p>
      </div>
   );
}
