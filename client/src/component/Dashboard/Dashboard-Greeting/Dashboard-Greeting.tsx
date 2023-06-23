import { useAppSelector } from "@src/hook";

import style from "./Dashboard-Greeting.module.scss";

export function DashboardGreeting() {
   const { username } = useAppSelector(state => state.userReducer);

   return (
      <div className={ style.DashboardGreeting }>
         <div className={ style.top_line }>
            <span className={ style.hello }> Привіт, </span>
            <span className={ style.username }>{ username ? username : "завантажую" }</span>
         </div>

         <div className={ style.bottom_line }>
            <span className={ style.how_are_you }> Ну, як ти? </span>
         </div>
      </div>
   );
}
