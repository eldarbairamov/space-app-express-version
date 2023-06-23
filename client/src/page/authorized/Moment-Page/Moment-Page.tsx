import { MomentHeader, MomentList, ModalWLoader } from "@src/component";
import { addMomentService, getMomentsService } from "@src/service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { MOMENTS_COLOR } from "@src/constant";

import style from "./Moment-Page.module.scss";

export function MomentsPage() {
   const { isLoading } = getMomentsService();

   const { addMomentFn } = addMomentService();

   return (
      <>
         <motion.div className={ style.MomentPage }
                     variants={ horizontalPresent }
                     initial={ "initial" }
                     animate={ "animate" }>

            <MomentHeader addMomentFn={ addMomentFn }/>
            <MomentList/>
         </motion.div>

         <ModalWLoader isLoading={ isLoading } color={MOMENTS_COLOR}/>
      </>
   );
}
