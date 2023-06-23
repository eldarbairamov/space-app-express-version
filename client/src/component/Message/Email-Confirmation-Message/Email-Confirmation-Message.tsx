import { Result } from "antd";
import { v4 } from "uuid";
import { UnauthorizedRouter, UnauthorizedRoutesEnum } from "@src/router";
import { useSearchParams } from "react-router-dom";
import { emailConfirmationService, logoutService } from "@src/service";
import { Button, SuccessIcon, UnsuccessIcon } from "@src/component";

import style from "./Email-Confirmation-Message.module.scss";

export function EmailConfirmationMessage() {
   const [ searchParams ] = useSearchParams();
   const confirmationToken = searchParams.get("token");

   const { isSuccess } = emailConfirmationService(confirmationToken!);

   const { logoutFn } = logoutService(() => UnauthorizedRouter.navigate(UnauthorizedRoutesEnum.LoginPage, { replace: true }));

   return (
      <div className={ style.EmailConfirmationMessage }>

         { isSuccess &&
            <Result className={ style.message }
                    icon={ <SuccessIcon/> }
                    title={ "Ви успішно оновили адресу електронної пошти" }
                    subTitle={ "Будь ласка, виконайте вхід до аккаунту використовуючи оновлені дані" }
                    extra={
                       <Button key={ v4() }
                               text={ "Увійти" }
                               onClick={ logoutFn }/>
                    }/>
         }

         { !isSuccess &&
            <Result className={ style.message }
                    icon={ <UnsuccessIcon/> }
                    title={ "Упс..." }
                    subTitle={ "Посилання більше не актуальне" }/>
         }

      </div>
   );
}
