import { CSSProperties } from "react";

import style from "./Button.module.scss";

interface IButtonProps {
   text: string;
   onClick?: any;
   disabled?: boolean;
   style?: CSSProperties;
}

export function Button({ text, ...props }: IButtonProps) {
   return (
      <button className={ style.Button } { ...props }> { text } </button>
   );
}
