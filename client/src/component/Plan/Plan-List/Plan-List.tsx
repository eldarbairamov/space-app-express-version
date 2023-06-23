import { PlanItem } from "@src/component";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { planAction } from "@src/redux/slice";
import { useObserver } from "@src/hook/use-observer";
import { v4 as uuid } from "uuid";

import style from "./Plan-List.module.scss";
import emptyDark from "/empty-dark.svg";
import emptyLight from "/empty-light.svg";

export function PlanList() {
   const { plans } = useAppSelector(state => state.planReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const { lastElemRef } = useObserver(() => dispatch(planAction.next()))

   return (
      <div className={ style.PlanList }>
         { Boolean(plans.length) &&
            <div className={ style.plan_list }>
               { plans && plans.map((item, index) => {
                  if (plans.length == index + 1) {
                     return <PlanItem ref={ lastElemRef }
                                      key={ uuid() }
                                      plan={ item }/>;
                  } else {
                     return <PlanItem key={ uuid() }
                                      plan={ item }/>;
                  }
               }) }
            </div>
         }

         { Boolean(!plans.length) &&
            <div className={ style.no_plans_wrapper }>
               <img src={ isDark ? emptyLight : emptyDark }
                    alt={ "empty" }
                    style={ { width: "80px" } }/>
            </div>
         }
      </div>
   );
}
