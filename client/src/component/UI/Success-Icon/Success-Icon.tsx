import { useAppSelector } from "@src/hook";

import successLight from '/success-light.svg'
import successDark from '/success-dark.svg'

export function SuccessIcon() {
   const { isDark } = useAppSelector(state => state.appReducer);

   return (
      <img src={ isDark ? successLight : successDark } alt="success" style={ { width: 100, height: 100 } }/>
   )
}
