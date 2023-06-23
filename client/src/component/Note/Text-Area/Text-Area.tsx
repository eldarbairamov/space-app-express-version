import { ChangeEvent } from "react";

import { INote } from "@src/interface";

import style from './Text-Area.module.scss'

interface ITextAreaProps {
   handleInputs: (field: string, value: string) => void,
   updateNoteFn: (activeNote: INote) => Promise<void>
   font: string,
   activeNote: INote
}

export function TextArea({ font, activeNote, handleInputs, updateNoteFn }: ITextAreaProps) {
   return (
      <div className={ style.TextArea }>
            <textarea id={ "body" }
                      data-font={ font }
                      value={ activeNote.body !== undefined ? activeNote.body : "" }
                      placeholder={ "Розкажи мені щось цікаве..." }
                      onChange={ (e: ChangeEvent<HTMLTextAreaElement>) => handleInputs("body", e.target.value) }
                      onBlur={ () => updateNoteFn(activeNote) }/>
      </div>
   )
}
