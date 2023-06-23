import { useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { FormControl } from "@src/component";
import { AuthorizedRouter, AuthorizedRoutesEnum } from "@src/router";
import { IChangePasswordForm } from "@src/interface";
import { changePasswordValidator } from "@src/validator/auth.validator";
import { App } from "antd";
import { getUserService, changePasswordService } from "@src/service";
import { Button } from "@src/component";
import { useAppSelector } from "@src/hook";
import { scrollToElement } from "@src/helper/scroll-to-element";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";

import style from "./Change-Password-Form.module.scss";

export function ChangePasswordForm() {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<IChangePasswordForm>({
      resolver: joiResolver(changePasswordValidator),
      mode: "onTouched",
   });
   const { message } = App.useApp();

   const { username, name, surname } = useAppSelector(state => state.userReducer);

   const { getUserFn } = getUserService();
   const { updatePasswordFn } = changePasswordService(() => AuthorizedRouter.navigate(AuthorizedRoutesEnum.ChangePasswordMessage, { replace: true }));

   const onSubmit: SubmitHandler<IChangePasswordForm> = async ({ repeatPassword, newPassword, currentPassword }: IChangePasswordForm) => {
      if (newPassword === repeatPassword) await updatePasswordFn(newPassword, currentPassword);
      else message.error("Паролі не співпадають");
   };

   useEffect(() => {
      if (!(username && name && username)) getUserFn();
      scrollToElement();

   }, [ username, name, surname ]);

   return (
      <motion.form className={ style.ChangePasswordForm }
                   onSubmit={ handleSubmit(onSubmit) }
                   variants={ horizontalPresent }
                   initial={ "initial" }
                   animate={ "animate" }>

         <FormControl labelName={ "Поточний пароль" }
                      fieldName={ "currentPassword" }
                      register={ register }
                      isRequired={ true }
                      errorMessage={ errors.currentPassword?.message }
                      isPassword={ true }/>

         <FormControl labelName={ "Новий пароль" }
                      fieldName={ "newPassword" }
                      isRequired={ true }
                      register={ register }
                      errorMessage={ errors.newPassword?.message }
                      isPassword={ true }/>

         <FormControl labelName={ "Повторіть пароль" }
                      fieldName={ "repeatPassword" }
                      register={ register }
                      isRequired={ true }
                      errorMessage={ errors.repeatPassword?.message }
                      isPassword={ true }/>

         <Button disabled={ !isValid }
                 text={ "Зберегти" }
                 style={ { width: "100%" } }/>

      </motion.form>
   );
}
