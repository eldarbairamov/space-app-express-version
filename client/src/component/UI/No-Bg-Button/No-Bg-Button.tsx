import style from "./No-Bg-Button.module.scss";

interface IInvisibleButtonProps {
   text: string;
   hoverSubject?: string;
   onClick: () => Promise<void>;
}

export function NoBgButton({ text, hoverSubject, ...props }: IInvisibleButtonProps) {
   return (
      <button className={ style.NoBgButton }
              data-hover={ hoverSubject } { ...props } >
         { text }
      </button>
   );
}
