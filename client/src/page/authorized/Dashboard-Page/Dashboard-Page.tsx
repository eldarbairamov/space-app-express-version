import { DashboardAvatar, DashboardGreeting, MomentCount, NoteCount, PlanCount, SwitchButton, SettingsIcon, ModalWLoader } from "@src/component";
import { getUserService } from "@src/service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { DASHBOARD_COLOR } from "@src/constant";

import style from "./Dashboard-Page.module.scss";

export function DashboardPage() {
   const { isLoading } = getUserService();

   return (
      <>
         <motion.div className={ style.DashboardPage }
                     variants={ horizontalPresent }
                     initial={ "initial" }
                     animate={ "animate" }>

            <div className={ style.top }>
               <DashboardAvatar/>
               <DashboardGreeting/>
               <SwitchButton/>
               <SettingsIcon/>
            </div>

            <div className={ style.bottom }>
               <NoteCount/>
               <PlanCount/>
               <MomentCount/>
            </div>

         </motion.div>

         <ModalWLoader isLoading={ isLoading } color={ DASHBOARD_COLOR }/>
      </>
   );
}
