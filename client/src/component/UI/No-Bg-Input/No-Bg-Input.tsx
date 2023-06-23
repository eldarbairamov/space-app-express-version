import style from "./No-Bg-Input.module.scss";

export function NoBgInput({ ...props }) {
   return <input className={ style.NoBgInput } { ...props }/>;
}
