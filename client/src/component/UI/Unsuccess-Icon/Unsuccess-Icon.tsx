import { useAppSelector } from "@src/hook";

import unsuccessLight from '/unsuccess-light.svg'
import unsuccessDark from '/unsuccess-dark.svg'

export function UnsuccessIcon() {
   const { isDark } = useAppSelector(state => state.appReducer);

   return (
      <img src={ isDark ? unsuccessLight : unsuccessDark } alt="success" style={ { width: 100, height: 100 } }/>
   )
}
