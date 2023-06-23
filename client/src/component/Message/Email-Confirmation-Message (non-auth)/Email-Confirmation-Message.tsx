import { Result } from "antd";
import { v4 } from "uuid";
import { AuthorizedRouter, UnauthorizedRoutesEnum } from "@src/router";
import { useSearchParams } from "react-router-dom";
import { emailConfirmationService } from "@src/service";
import { Button, SuccessIcon } from "@src/component";

import style from "./Email-Confirmation-Message.module.scss";

export function EmailConfirmationMessage() {
   const [ searchParams ] = useSearchParams();
   const confirmationToken = searchParams.get("token");

   const { isSuccess } = emailConfirmationService(confirmationToken!);

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
                               onClick={ () => AuthorizedRouter.navigate(UnauthorizedRoutesEnum.LoginPage, { replace: true }) }/>
                    }
            />
         }

         { !isSuccess &&
            <Result className={ style.message }
                    status="404"
                    title="Упс..."
                    subTitle="Посилання більше не актуальне"
            />
         }

      </div>
   );
}
