import { useAppSelector } from "@src/hook";

import style from './Name-Sectrion.module.scss'

export function NameSection () {
   const { username, name, surname } = useAppSelector(state => state.userReducer);

   return (
      <div className={ style.NameSection }>
         <p className={ style.username }> { username && username } </p>
         <p className={ style.fullname }>
            { (surname && name) && `${ name } ${ surname }` }
            { (name && !surname) && name }
            { (surname && !name) && surname }
         </p>
      </div>
   )
}
