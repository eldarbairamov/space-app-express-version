import { appActions } from "@src/redux/slice";

import { Switch } from "antd";
import { useAppDispatch, useAppSelector } from "@src/hook";

import style from './Switch-Button.module.scss'

export function SwitchButton() {
   const { isDark } = useAppSelector(state => state.appReducer);
   const dispatch = useAppDispatch();

   return (
      <Switch className={ style.Switch }
              defaultChecked={ isDark }
              size={ "small" }
              onChange={ () => dispatch(appActions.switchTheme(!isDark)) }/>
   )
}
