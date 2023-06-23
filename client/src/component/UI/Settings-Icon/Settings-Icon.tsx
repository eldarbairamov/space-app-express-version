import { useAppSelector } from "@src/hook";
import { AuthorizedRouter, AuthorizedRoutesEnum } from "@src/router";

import style from "./Settings-Icon.module.scss";
import settingsDark from "/settings-dark.svg";
import settingsLight from "/settings-light.svg";

export function SettingsIcon() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const editProfile = () => AuthorizedRouter.navigate(AuthorizedRoutesEnum.Settings);

   return (
      <img className={style.SettingsIcon}
           src={ isDark ? settingsLight : settingsDark }
           alt="settings"
           onClick={ editProfile }
           style={ { width: "25px" } }/>
   )
}
