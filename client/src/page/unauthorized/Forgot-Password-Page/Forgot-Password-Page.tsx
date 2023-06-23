import { ForgotPasswordForm, SwitchButton, WelcomeLogo } from "@src/component";
import { UnauthorizedRouter } from "@src/router";
import { forgotPasswordService } from "@src/service";

import style from "./Forgot-Password-Page.module.scss";

export function ForgotPasswordPage() {
   const { forgotPasswordFn } = forgotPasswordService(() => UnauthorizedRouter.navigate("/forgot_password_message", { replace: true }));

   return (
      <div className={ style.ForgotPasswordPage }>
         <WelcomeLogo/>
         <ForgotPasswordForm forgotPasswordFn={ forgotPasswordFn }/>
         <SwitchButton/>
      </div>
   );
}
