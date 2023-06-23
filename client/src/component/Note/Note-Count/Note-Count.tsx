import { Divider } from "antd";
import { useAppSelector } from "@src/hook";

import style from "./Note-Count.module.scss";

export function NoteCount() {
   const { notesCount } = useAppSelector(state => state.userReducer);

   return (
      <div className={ style.NoteCount }>
         <Divider> Замітки </Divider>

         <div className={style.count_wrapper}>
            <p> { notesCount } </p>
         </div>
      </div>
   );
}
