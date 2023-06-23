import { useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { FormControl } from "@src/component";
import { updateProfile } from "@src/validator/user.validator";
import { useAppSelector } from "@src/hook";
import { IUpdateProfileForm } from "@src/interface";
import { updateProfileService } from "@src/service";
import { Button } from "@src/component";

import style from "./Profile-Update-Form.module.scss";

export function ProfileUpdateForm() {
   const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<IUpdateProfileForm>({
      resolver: joiResolver(updateProfile),
      mode: "onTouched",
   });

   const { updateProfileFn } = updateProfileService();

   const { username, name, surname } = useAppSelector(state => state.userReducer);

   useEffect(() => {
      setValue("username", username);
      setValue("name", name ? name : undefined);
      setValue("surname", surname ? surname : undefined);

   }, [ username, name, surname ]);

   const onSubmit: SubmitHandler<IUpdateProfileForm> = async (data) => updateProfileFn(data);

   return (
      <form className={ style.ProfileUpdateForm } onSubmit={ handleSubmit(onSubmit) }>

         <FormControl labelName={ "Ім'я користувача" }
                      fieldName={ "username" }
                      errorMessage={ errors.username?.message }
                      isRequired={ true }
                      isPassword={ false }
                      register={ register }/>

         <FormControl labelName={ "Ім'я" }
                      fieldName={ "name" }
                      errorMessage={ errors.name?.message }
                      isPassword={ false }
                      register={ register }/>

         <FormControl labelName={ "Фамілія" }
                      fieldName={ "surname" }
                      errorMessage={ errors.surname?.message }
                      isPassword={ false }
                      register={ register }/>

         <Button text={ "Зберегти" }
                 style={ { width: "100%" } }
                 disabled={ !isValid }/>
      </form>
   );
}
