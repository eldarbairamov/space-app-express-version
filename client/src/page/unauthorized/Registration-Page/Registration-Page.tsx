import { RegistrationForm, SwitchButton, WelcomeLogo } from "@src/component";
import { UnauthorizedRouter } from "@src/router";
import { registrationService } from "@src/service";

import style from "./Registration-Page.module.scss";

export function RegistrationPage() {
   const { registrationFn } = registrationService(() => UnauthorizedRouter.navigate("/registration_success", { replace: true }));

   return (
      <div className={ style.RegistrationPage }>
         <WelcomeLogo/>
         <RegistrationForm registrationFn={ registrationFn }/>
         <SwitchButton/>
      </div>
   );
}
