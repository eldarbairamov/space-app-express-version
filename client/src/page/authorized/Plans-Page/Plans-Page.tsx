import { PlanHeader, PlanList, ModalWLoader } from "@src/component";
import { getPlansService } from "@src/service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { PLANS_COLOR } from "@src/constant";

import style from "./Plans-Page.module.scss";

export function PlansPage() {
   const { isLoading } = getPlansService();

   return (
      <>
         <motion.div className={ style.PlansPage }
                     variants={ horizontalPresent }
                     initial={ "initial" }
                     animate={ "animate" }>
            <PlanHeader/>
            <PlanList/>

         </motion.div>

         <ModalWLoader isLoading={ isLoading } color={ PLANS_COLOR }/>
      </>
   );
}
