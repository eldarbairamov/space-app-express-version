import bg from "/background-light.jpeg";
import bgDark from "/background-dark.jpeg";

export function BgPreload() {
   return (
      <div style={ { display: "none" } }>
         <img src={ bg }
              alt=""/>
         <img src={ bgDark }
              alt=""/>
      </div>
   )
}
