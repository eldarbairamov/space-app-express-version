import { IMoment } from "@src/interface";

import style from './Title.module.scss'

interface ITitleProps {
   activeMoment: IMoment
   handleInputs: (field: string, value: string) => void
}

export function Title({ activeMoment, handleInputs }: ITitleProps) {
   return (
      <input className={ style.Title }
             type={ "text" }
             placeholder={ 'Новий момент' }
             value={ activeMoment.title }
             style={ { minWidth: activeMoment.title.length * 10 } }
             onChange={ event => handleInputs("title", event.target.value) }/>
   )
}
