export interface IChangePasswordForm {
   newPassword: string;
   currentPassword: string;
   repeatPassword: string;
}

export interface IUpdateProfileForm {
   username: string;
   name: string | undefined;
   surname: string | undefined;
}

export interface ILoginForm {
   email: string;
   password: string;
}

export interface IRegistrationForm {
   email: string;
   username: string;
   password: string;
}

export interface IResetPasswordForm {
   newPassword: string;
   repeatPassword: string;
}
