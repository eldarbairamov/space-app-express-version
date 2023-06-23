import React from "react";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@src/hook";

import styles from "./Back-Icon.module.scss";
import backLight from "/back-light.svg";
import backDark from "/back-dark.svg";

export function BackIcon({ isBg, style }: { isBg?: any, style?: React.CSSProperties }) {
   const { isDark } = useAppSelector(state => state.appReducer);

   const navigate = useNavigate();

   return (
      <div className={ styles.wrapper } data-bg={ isBg } style={ style }>
         <img className={ styles.BackIcon }
              src={ isBg ? backLight : isDark ? backLight : backDark }
              alt={ "back" }
              onClick={ () => navigate(-1) }
              style={ { width: "30px" } }/>
      </div>
   );
}
