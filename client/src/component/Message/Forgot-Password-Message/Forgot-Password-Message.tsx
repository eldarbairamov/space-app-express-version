import { Result } from "antd";
import { Button, SuccessIcon } from "@src/component";
import { v4 } from "uuid";
import { UnauthorizedRouter, UnauthorizedRoutesEnum } from "@src/router";

import style from "./Forgot-Password-Message.module.scss";

export function ForgotPasswordMessage() {
   return (
      <div className={ style.ForgotPasswordMessage }>
         <Result className={ style.message }
                 icon={ <SuccessIcon/> }
                 title={ "Ура!" }
                 subTitle={ "Лист із подальшою інструкцією вже летить на вказану електронну пошту" }
                 extra={
                    <Button key={ v4() }
                            text={ "Окей" }
                            onClick={ () => UnauthorizedRouter.navigate(UnauthorizedRoutesEnum.LoginPage, { replace: true }) }/>
                 }
         />
      </div>
   );
}
