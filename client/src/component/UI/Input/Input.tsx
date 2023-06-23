import { CSSProperties } from "react";

import style from "./Input.module.scss";

interface IInputProps {
   type: string;
   value: string;
   onChange: any;
   style?: CSSProperties;
}

export function Input({ ...props }: IInputProps) {
   return (
      <div className={ style.Input }>
         <input { ...props }/>
      </div>
   );
}
