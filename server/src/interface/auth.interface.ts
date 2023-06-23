export interface IRegistration {
   readonly username: string;
   readonly email: string;
   readonly password: string;
}

export interface IOAuthResponse {
   readonly username: string;
   readonly accessToken: string;
   readonly refreshToken: string;
}

export interface ILogin {
   readonly email: string;
   readonly password: string;
}

export interface IResetPassword {
   readonly resetPasswordToken: string;
   readonly password: string;
}
