import style from "./Tag.module.scss";
import { TypedOnChange } from "@src/interface/common.interface";
import { momentActions } from "@src/redux/slice";
import { useAppDispatch } from "@src/hook";
import { IMoment } from "@src/interface";

export function Tag({ activeMoment }: { activeMoment: IMoment }) {
   const dispatch = useAppDispatch();

   const handleTag = (event: TypedOnChange) => dispatch(momentActions.editTag(event.target.value));

   return (
      <div className={ style.Tag }>
         <input className={ style.tag }
                style={ { minWidth: activeMoment.tag.length * 12 } }
                type={ "text" }
                value={ activeMoment.tag }
                placeholder={ "тег" }
                onChange={ handleTag }/>
      </div>
   );
}
