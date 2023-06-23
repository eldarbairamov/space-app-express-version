import React, { forwardRef } from "react";

import { useNavigate } from "react-router-dom";
import { IPlan } from "@src/interface";
import dateHelper from "moment/moment";
import { TypedOnClick } from "@src/interface/common.interface";
import { deletePlanService } from "@src/service";
import { useAppSelector } from "@src/hook";

import style from "./Plan-Item.module.scss";
import brain from "/brain.png";
import deleteDark from '/delete-dark.svg'
import deleteLight from '/delete-light.svg'
import { AuthorizedRoutesEnum } from "@src/router";

interface IPlanItemProps {
   plan: IPlan;
}

export const PlanItem = forwardRef(({ plan }: IPlanItemProps, ref: any) => {
   const { total, searchKey } = useAppSelector(state => state.planReducer);

   const titleCondition = plan && plan.title.split("").length > 16;

   const navigate = useNavigate();

   const { deletePlanFn } = deletePlanService();

   const deletePlan = async (event: TypedOnClick<HTMLParagraphElement>, targetId: string) => {
      event.stopPropagation();
      await deletePlanFn(targetId, total, searchKey);
   };

   const { isDark } = useAppSelector(state => state.appReducer);

   const choosePlan = (plan: IPlan) => navigate(AuthorizedRoutesEnum.TasksPage = plan.id);

   return (
      <div ref={ ref } className={ style.PlanItem }
           onClick={ () => choosePlan(plan) }>

         <p className={ style.plan_name }> { titleCondition ? plan.title.substring(0, 16) + "..." : plan.title }  </p>

         <img className={ style.delete }
              src={ isDark ? deleteLight : deleteDark }
              alt={ "delete" }
              onClick={ event => deletePlan(event, plan.id) }/>

         <img src={ brain } alt="folder"/>

         <p className={ style.plan_date }>
            { dateHelper(plan.lastModified).format("DD-MM-YYYY, HH:mm") }
         </p>

      </div>
   );
});
