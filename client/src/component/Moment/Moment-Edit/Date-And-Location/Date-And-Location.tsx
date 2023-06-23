import dateHelper from "moment/moment";
import { TypedOnChange } from "@src/interface/common.interface";
import { momentActions } from "@src/redux/slice";
import { useAppDispatch } from "@src/hook";
import { IMoment } from "@src/interface";

import style from "./Date-And-Location.module.scss";

interface IDateAndLocationProps {
   handleInputs: (field: string, value: string) => void,
   activeMoment: IMoment
}

export function DateAndLocation({ handleInputs, activeMoment }: IDateAndLocationProps) {
   const dispatch = useAppDispatch();

   const setDate = (event: TypedOnChange) => {
      const date = new Date(event.target.value).getTime();
      dispatch(momentActions.setDate(date));
   };

   return (
      <div className={ style.DateAndLocation }>
         <input className={ style.location }
                style={ { minWidth: activeMoment.location.length * 10 } }
                type={ "text" }
                placeholder={ 'Локація' }
                value={ activeMoment.location }
                onChange={ event => handleInputs("location", event.target.value) }/>

         <input className={ style.date }
                type={ "date" }
                defaultValue={ dateHelper(activeMoment.date).format("YYYY-MM-DD") }
                onChange={ setDate }/>
      </div>
   )
}
