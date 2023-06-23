import style from "./App-Logo.module.scss";

export function AppLogo() {
   return (
      <div className={ style.AppLogo }>
         <p className={ style.first }> [ </p>
         <p className={ style.second }> спейс </p>
         <p className={ style.third }> ] </p>
      </div>
   );
}
