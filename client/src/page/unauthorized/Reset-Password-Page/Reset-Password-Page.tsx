import { ResetPasswordForm, SwitchButton, WelcomeLogo } from "@src/component";
import { useSearchParams } from "react-router-dom";
import { UnauthorizedRouter } from "@src/router";
import { resetPasswordService } from "@src/service";

import style from "./Reset-Password-Page.module.scss";

export function ResetPasswordPage() {
   const [ searchParams ] = useSearchParams();

   const resetPasswordToken = searchParams.get("token");

   const { resetPasswordFn } = resetPasswordService(() => UnauthorizedRouter.navigate("/login", { replace: true }));

   return (
      <div className={ style.ResetPasswordPage }>
         <WelcomeLogo/>
         <ResetPasswordForm resetPasswordFn={ resetPasswordFn }
                            resetPasswordToken={ resetPasswordToken! }/>
         <SwitchButton/>
      </div>
   );
}
