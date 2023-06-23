import logoutDark from "/logout-dark.svg";
import logoutLight from "/logout-light.svg";
import { useAppSelector } from "@src/hook";
import { logoutService } from "@src/service";
import { UnauthorizedRouter, UnauthorizedRoutesEnum } from "@src/router";

export function LogoutIcon() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { logoutFn } = logoutService(() => UnauthorizedRouter.navigate(UnauthorizedRoutesEnum.LoginPage, { replace: true }));

   return (
      <img src={ isDark ? logoutLight : logoutDark }
           alt={ "logout" }
           style={ { width: "25px" } }
           onClick={ () => logoutFn() }/>
   );
}
