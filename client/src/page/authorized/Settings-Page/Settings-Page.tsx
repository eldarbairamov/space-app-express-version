import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { AuthSettings, EditPhoto, ModalWLoader, NameSection, UserPhoto } from "@src/component";
import { getUserService } from "@src/service";
import { DASHBOARD_COLOR } from "@src/constant";

import style from "./Settings-Page.module.scss";

export function SettingsPage() {
   const { isLoading } = getUserService();

   return (
      <>
         <motion.div className={ style.SettingsPage }
                     variants={ horizontalPresent }
                     initial={ "initial" }
                     animate={ "animate" }>

            <div className={ style.left_side }>
               <UserPhoto/>
               <EditPhoto/>
               <NameSection/>
               <AuthSettings/>
            </div>

            <div id={ "right_side" }
                 className={ style.right_side }>
               <Outlet/>
            </div>

         </motion.div>

         <ModalWLoader isLoading={ isLoading } color={ DASHBOARD_COLOR }/>
      </>
   );
}
