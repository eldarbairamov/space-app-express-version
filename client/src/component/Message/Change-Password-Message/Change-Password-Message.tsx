import { Result } from "antd";
import { v4 } from "uuid";
import { UnauthorizedRouter, UnauthorizedRoutesEnum } from "@src/router";
import { logoutService } from "@src/service";
import { Button, SuccessIcon } from "@src/component";

import style from "./Change-Password-Message.module.scss";

export function ChangePasswordMessage() {
   const { logoutFn } = logoutService(() => UnauthorizedRouter.navigate(UnauthorizedRoutesEnum.LoginPage, { replace: true }));

   return (
      <div className={ style.ChangePasswordMessage }>
         <Result className={ style.message }
                 icon={ <SuccessIcon/> }
                 title={ "Ви успішно оновили свій пароль" }
                 subTitle={ "Будь ласка, виконайте вхід до аккаунту використовуючи оновлені дані" }
                 extra={
                    <Button onClick={ logoutFn }
                            text={ "Увійти" }
                            key={ v4() }/>
                 }
         />

      </div>
   );
}
