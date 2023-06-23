import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { emailValidator } from "@src/validator/auth.validator";
import { FormControl } from "@src/component";
import { Button } from "@src/component";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";

import style from "./Forgot-Password-Form.module.scss";

interface IForgotPasswordFormProps {
   forgotPasswordFn: (email: string) => Promise<void>;
}

export function ForgotPasswordForm({ forgotPasswordFn }: IForgotPasswordFormProps) {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ email: string }>({
      resolver: joiResolver(emailValidator),
      mode: "onTouched",
   });

   const onSubmit: SubmitHandler<{ email: string }> = async ({ email }) => forgotPasswordFn(email);

   return (
      <motion.form className={ style.ForgotPasswordForm }
                   onSubmit={ handleSubmit(onSubmit) }
                   variants={ horizontalPresent }
                   initial={ "initial" }
                   animate={ "animate" }>

         <p className={ style.message }>
            Введіть адресу електронної пошти вашого аккаунту і ми пришлемо вам посилання на скидання пароля:
         </p>

         <FormControl labelName={ "" }
                      fieldName={ "email" }
                      style={ { textAlign: "center" } }
                      isRequired={ true }
                      register={ register }
                      errorMessage={ errors.email?.message }
                      isPassword={ false }/>

         <Button disabled={ !isValid }
                 text={ "Надіслати" }
                 style={ { width: "100%" } }/>

      </motion.form>
   );
}
