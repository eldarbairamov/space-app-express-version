import { CSSProperties, useState } from "react";

import { motion } from "framer-motion";
import { horizontalShaking } from "@src/animation";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { ValidationToaster } from "@src/component";

import style from "./Form-Control.module.scss";
import warning from "/warning.svg";

interface IInput {
   labelName: string,
   fieldName: string,
   errorMessage: string | undefined,
   isPassword: boolean
   register: UseFormRegister<any>,
   style?: CSSProperties,
   isRequired?: boolean,
}

export function FormControl({
                               register,
                               errorMessage,
                               isRequired,
                               fieldName,
                               labelName,
                               isPassword,
                               ...props
                            }: IInput) {
   const [ validationError, setValidationError ] = useState<{ message: string }>({ message: "" });
   const [ isPasswordHidden, setIsPasswordHidden ] = useState<boolean>(isPassword);

   const errorMessageWriter = (message: string) => {
      const errorMessage = { message };
      setValidationError({ ...errorMessage });
   };

   const passwordCondition: string = isPasswordHidden ? "password" : "text";
   const passwordValueCondition: string = isPasswordHidden ? "[ показати ]" : "[ скрити ]";

   const showHiddenPassword = (): void => setIsPasswordHidden(!isPasswordHidden);

   return (
      <>
         <ValidationToaster error={ validationError }/>

         <div className={ style.FormControl }>

            <div className={ style.password_wrapper }>

               <div className={ style.label_and_star }>
                  <label htmlFor={ "password" }> { labelName } </label>
                  { (isRequired && labelName) && <p style={ { color: 'indianred' } }> * </p> }
               </div>

               { isPassword && <p onClick={ showHiddenPassword }> { passwordValueCondition } </p> }

            </div>

            <div data-error={ !!errorMessage } className={ style.input_field }>
               <input id={ labelName } { ...props }
                      type={ passwordCondition }
                      { ...register(fieldName) }/>

               { errorMessage &&
                  <motion.div
                     variants={ horizontalShaking }
                     initial={ "initial" }
                     animate={ "animate" }>
                     <img src={ warning }
                          alt="warning"
                          style={ { width: "21px" } }
                          onClick={ () => errorMessageWriter(errorMessage) }/>
                  </motion.div>
               }
            </div>

         </div>

      </>
   );
}
