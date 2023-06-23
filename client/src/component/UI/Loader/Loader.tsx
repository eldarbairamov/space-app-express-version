import { motion } from "framer-motion";
import { fadePresent } from "@src/animation";
import { ConfigProvider, Spin } from "antd";

import style from "./Loader.module.scss";

export function Loader({ color }: { color: string }) {
   return (
      <motion.div className={ style.Loader }
                  variants={ fadePresent }
                  initial={ "initial" }
                  animate={ "animate" }>
         <ConfigProvider theme={ { components: { Spin: { colorPrimary: color } } } }>
            <Spin size={ "large" }/>
         </ConfigProvider>
         <p>Секундочку...</p>
      </motion.div>
   );
}
