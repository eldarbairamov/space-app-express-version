import { Result } from "antd";
import { useRouteError } from "react-router-dom";
import { v4 } from "uuid";
import { AuthorizedRouter, UnauthorizedRouter, UnauthorizedRoutesEnum } from "@src/router";
import { Button, UnsuccessIcon } from "@src/component";
import { AuthorizedRoutesEnum } from "@src/router/authorized.type";
import { useAppSelector } from "@src/hook";

import style from "./Error-Message.module.scss";

export function ErrorMessage() {
   const { isLogin } = useAppSelector(state => state.authReducer);
   const error = useRouteError() as Error;
   console.log(error);

   return (
      <div>
         <div className={ style.ErrorMessage }>
            <Result className={ style.message }
                    icon={ <UnsuccessIcon/> }
                    title={ "Ой..." }
                    subTitle={ "Несподівана помилка" }
                    extra={
                       <Button key={ v4() }
                               text={ "На головну" }
                               onClick={ () => {
                                  if (isLogin) AuthorizedRouter.navigate(AuthorizedRoutesEnum.DashboardPage, { replace: true });
                                  UnauthorizedRouter.navigate(UnauthorizedRoutesEnum.LogoPage, { replace: true });
                               } }/>
                    }
            />
         </div>
      </div>
   );
}
