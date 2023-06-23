import { Result } from "antd";
import { v4 } from "uuid";
import { UnauthorizedRouter, UnauthorizedRoutesEnum } from "@src/router";
import { Button, SuccessIcon } from "@src/component";

import style from "./Registration-Success-Message.module.scss";

export function RegistrationSuccessMessage() {
   return (
      <div className={ style.RegistrationSuccessMessage }>
         <Result className={ style.message }
                 icon={ <SuccessIcon/> }
                 title={ "Ви успішно зареєструвались" }
                 subTitle={ "Код активації вже летить на вказану електронну пошту" }
                 extra={
                    <Button text={ "Перейти до активації" }
                            key={ v4() }
                            onClick={ () => UnauthorizedRouter.navigate(UnauthorizedRoutesEnum.ActivationPage, { replace: true }) }/>
                 }
         />
      </div>
   );
}
