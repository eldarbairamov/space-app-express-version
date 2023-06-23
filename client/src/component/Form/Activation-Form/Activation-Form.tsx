import { ChangeEvent, FormEvent, useState } from "react";

import { Input, Button } from "@src/component";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";

import style from "./Activation-Form.module.scss";

interface ActivationFormProps {
   activationFn: (body: string) => Promise<void>;
}

export function ActivationForm({ activationFn }: ActivationFormProps) {
   const [ value, setValue ] = useState<string>("");

   const handleChange = (value: string) => setValue(value);

   const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await activationFn(value);
   };

   return (
      <motion.div className={ style.ActivationForm }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }>

         <p className={ style.message }> Введіть код активації: </p>

         <Input type="text"
                value={ value }
                onChange={ (e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value) }/>

         <Button disabled={ !value }
                 text={ "Активувати" }
                 style={ { width: "100%" } }
                 onClick={ (e: FormEvent<HTMLButtonElement>) => handleSubmit(e) }/>

      </motion.div>
   );
}
