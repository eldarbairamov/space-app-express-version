import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { resetPasswordValidator } from "@src/validator/auth.validator";
import { FormControl } from "@src/component";
import { IResetPasswordForm } from "@src/interface";
import { Button } from "@src/component";
import { App } from "antd";

import style from "./Reset-Password-Form.module.scss";

interface IResetPasswordFormProps {
   resetPasswordFn: (password: string, token: string) => Promise<void>;
   resetPasswordToken: string;
}

export function ResetPasswordForm({ resetPasswordFn, resetPasswordToken }: IResetPasswordFormProps) {
   const { message } = App.useApp();

   const { register, handleSubmit, formState: { errors, isValid } } = useForm<IResetPasswordForm>({
      resolver: joiResolver(resetPasswordValidator),
      mode: "onTouched",
   });

   const onSubmit: SubmitHandler<IResetPasswordForm> = async ({ newPassword, repeatPassword }: IResetPasswordForm) => {
      if ((newPassword && resetPasswordToken) && (newPassword === repeatPassword)) await resetPasswordFn(newPassword, resetPasswordToken!)
      else message.error("Паролі не співпадають")
   };

   return (
      <form className={ style.ResetPasswordForm } onSubmit={ handleSubmit(onSubmit) }>

         <FormControl labelName={ "Новий пароль" }
                      fieldName={ "newPassword" }
                      register={ register }
                      isRequired={ true }
                      errorMessage={ errors.newPassword?.message }
                      isPassword={ true }/>

         <FormControl labelName={ "Повторіть пароль" }
                      fieldName={ "repeatPassword" }
                      register={ register }
                      isRequired={ true }
                      errorMessage={ errors.repeatPassword?.message }
                      isPassword={ true }/>

         <Button disabled={ !isValid }
                 style={ { width: "100%" } }
                 text={ "Зберегти" }/>

      </form>
   );
}
