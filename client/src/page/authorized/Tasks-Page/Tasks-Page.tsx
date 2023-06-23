import { IPlan } from "@src/interface";
import { TaskAdd, TaskHeader, TaskList, ModalWLoader } from "@src/component";
import { getTasksService } from "@src/service";
import { useParams } from "react-router-dom";
import { getOnePlanService } from "@src/service/plan/get-one-plan.service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { PLANS_COLOR } from "@src/constant";

import style from "./Tasks-Page.module.scss";

export function TasksPage() {
   const { planId } = useParams<{ planId: IPlan["id"] }>();

   getOnePlanService(planId!)

   const { isLoading } = getTasksService(planId!);

   return (
      <>
         <motion.div className={ style.TasksPage }
                     variants={ horizontalPresent }
                     initial={ "initial" }
                     animate={ "animate" }>

            <TaskHeader/>
            <TaskAdd/>
            <TaskList/>
         </motion.div>

         <ModalWLoader isLoading={ isLoading } color={PLANS_COLOR}/>
      </>
   );
}
