import { AppLogo, LogoutIcon, MenuDropdown } from "@src/component";

import style from "./Burger-Navbar.module.scss";

export function BurgerNavbar() {

   return (
      <div className={ style.BurgerNavbar }>
         <div className={ style.logo }>
            <AppLogo/>
         </div>

         <div className={ style.menu }>
            <MenuDropdown/>
            <LogoutIcon/>
         </div>
      </div>
   );
}
