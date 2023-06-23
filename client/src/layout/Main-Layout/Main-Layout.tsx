import React from "react";

import { Outlet } from "react-router-dom";
import { LayoutNavbar, BurgerNavbar } from "@src/component";
import { useMatchMedia } from "@src/hook";

import style from "./Main-Layout.module.scss";

export function MainLayout() {
   const { isWidth1000 } = useMatchMedia();

   return (
      <div className={ style.MainLayout }>
         { !isWidth1000 ? <LayoutNavbar/> : <BurgerNavbar/> }

         <div className={ style.body }>
            <Outlet/>
         </div>

      </div>
   );
}
