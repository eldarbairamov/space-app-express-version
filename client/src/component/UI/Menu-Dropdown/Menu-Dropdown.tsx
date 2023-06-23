import { Dropdown, MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@src/hook";

import menuDark from "/menu-dark.svg";
import menuLight from "/menu-light.svg";

export function MenuDropdown() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const items: MenuProps["items"] = [
      {
         key: "1",
         label: (
            <NavLink to={ "/dashboard" }>
               Головна
            </NavLink>
         ),
      },
      {
         key: "2",
         label: (
            <NavLink to={ "/notes" }>
               Замітки
            </NavLink>
         ),
      },
      {
         key: "3",
         label: (
            <NavLink to={ "/plans" }>
               Плани
            </NavLink>
         ),
      },
      {
         key: "4",
         label: (
            <NavLink to={ "/moments" }>
               Моменти
            </NavLink>
         ),
      },
   ];

   return (
      <Dropdown menu={ { items } }
                placement="bottomRight"
                trigger={ [ "click" ] }>
         <img src={ isDark ? menuLight : menuDark }
              alt={ "menu" }
              style={ { width: "30px" } }/>
      </Dropdown>
   );
}
