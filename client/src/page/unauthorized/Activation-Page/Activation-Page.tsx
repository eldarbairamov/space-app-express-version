import { ActivationForm, SwitchButton, WelcomeLogo } from "@src/component";
import { UnauthorizedRouter } from "@src/router";
import { activationService } from "@src/service";

import style from "./Activation-Page.module.scss";

export function ActivationPage() {
   const { activationFn } = activationService(() => UnauthorizedRouter.navigate("/login", { replace: true }));

   return (
      <div className={ style.ActivationPage }>
         <WelcomeLogo/>
         <ActivationForm activationFn={ activationFn }/>
         <SwitchButton/>
      </div>
   );
}
