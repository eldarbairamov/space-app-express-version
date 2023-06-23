import { Result } from "antd";
import { UnauthorizedRouter, UnauthorizedRoutesEnum } from "@src/router";
import { v4 } from "uuid";
import { Button, LockIcon } from "@src/component";
import { authActions } from "@src/redux/slice";
import { useAppDispatch } from "@src/hook";
import { storageService } from "@src/service";

import style from "./Unauthorized-Message.module.scss";

export function UnauthorizedMessage() {
   const dispatch = useAppDispatch()

   return (
      <div className={ style.UnauthorizedMessage }>
         <Result className={ style.message }
                 icon={ <LockIcon/> }
                 title={ "Упс..." }
                 subTitle={ "Ви не авторизовані" }
                 extra={
                    <Button key={ v4() }
                            text={ "Увійти" }
                            onClick={ () => {
                               storageService.deleteTokens();
                               dispatch(authActions.setIsLogin(false))
                               UnauthorizedRouter.navigate(UnauthorizedRoutesEnum.LoginPage, { replace: true });
                            } }/>
                 }
         />
      </div>
   );
}
