export interface ILogin {
   readonly email: string;
   readonly password: string;
}

export interface IRegistration {
   readonly username: string;
   readonly email: string;
   readonly password: string;
}

export interface IOAuth {
   readonly username: string;
   readonly accessToken: string;
   readonly refreshToken: string;
}