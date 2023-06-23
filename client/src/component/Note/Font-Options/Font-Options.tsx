import { noteActions } from "@src/redux/slice";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { Dropdown, MenuProps } from "antd";

import style from "./Font-Options.module.scss"
import fontDark from "/font-dark.svg";
import fontLight from "/font-light.svg";

export function FontOptions() {
   const dispatch = useAppDispatch();

   const { isDark } = useAppSelector(state => state.appReducer);

   const items: MenuProps["items"] = [
      {
         key: "1",
         label: (
            <p className={ style.normal } onClick={ () => dispatch(noteActions.changeFont("Roboto")) }>
               Normal
            </p>
         ),
      },
      {
         key: "2",
         label: (
            <p className={ style.caveat } onClick={ () => dispatch(noteActions.changeFont("Caveat")) }>
               Handwrite
            </p>
         ),
      },
   ];

   return (
      <div className={ style.FontOptions }>
         <Dropdown menu={ { items, selectable: true } }
                   placement={ "bottomRight" }
                   trigger={ [ "click" ] }>
            <img src={ isDark ? fontLight : fontDark }
                 className={ style.font_img }
                 alt={ "menu" }
                 style={ { width: 15 } }/>
         </Dropdown>
      </div>
   )
}
