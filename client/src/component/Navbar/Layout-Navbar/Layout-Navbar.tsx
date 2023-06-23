import { NavLink } from "react-router-dom";
import { AppLogo, LogoutIcon } from "@src/component";

import style from "./Layout-Navbar.module.scss";

export function LayoutNavbar() {

   return (
      <div className={ style.LayoutNavbar }>

         <div className={ style.logo }>
            <AppLogo/>
         </div>

         <div className={ style.navigation }>
            <div className={ style.dashboard_link }>
               <NavLink to={ "/dashboard" }>
                  Головна
               </NavLink>
            </div>
            <div className={ style.notes_link }>
               <NavLink className={ style.category }
                        to={ "/notes" }>
                  Замітки
               </NavLink>
            </div>
            <div className={ style.plans_link }>
               <NavLink className={ style.category }
                        to={ "/plans" }>
                  Плани
               </NavLink>
            </div>
            <div className={ style.moments_link }>
               <NavLink className={ style.category }
                        to={ "/moments" }>
                  Моменти
               </NavLink>
            </div>
         </div>

         <div className={ style.logout }>
            <LogoutIcon/>
         </div>

      </div>
   );
}
