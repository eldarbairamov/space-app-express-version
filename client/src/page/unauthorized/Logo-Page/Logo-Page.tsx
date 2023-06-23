import { SwitchButton, WelcomeLogo } from "@src/component";
import { motion } from "framer-motion";
import { p1, p2, p3, p4, logo } from "@src/animation";

import style from "./Logo-Page.module.scss";

export function LogoPage() {
   return (
      <div className={ style.WelcomePage }>

         <motion.div variants={ logo }
                     initial={ "initial" }
                     animate={ "animate" }>
            <WelcomeLogo/>
         </motion.div>

         <div className={ style.description }>
            <motion.p variants={ p1 }
                      initial={ "initial" }
                      animate={ "animate" }>
               Твій простір.
            </motion.p>

            <motion.p variants={ p2 }
                      initial={ "initial" }
                      animate={ "animate" }>
               Твої думки.
            </motion.p>

            <motion.p variants={ p3 }
                      initial={ "initial" }
                      animate={ "animate" }>
               Твої спогади.
            </motion.p>

         </div>

         <motion.div variants={ p4 }
                     initial={ "initial" }
                     animate={ "animate" }>
            <SwitchButton/>
         </motion.div>

      </div>
   );
}
