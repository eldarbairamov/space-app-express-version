import { useAppSelector } from "@src/hook";

import lockLight from '/lock-light.svg'
import logoutDark from "/lock-dark.svg";

export function LockIcon() {
   const { isDark } = useAppSelector(state => state.appReducer);

   return (
      <img src={ isDark ? lockLight : logoutDark } alt="success" style={ { width: 100, height: 100 } }/>
   )
}
