export enum UnauthorizedRoutesEnum {
   LogoPage = '/',
   LoginPage = '/login',
   RegistrationPage = '/registration',
   ForgotPasswordPage = '/password_forgot',
   ResetPasswordPage = '/password_reset/:token',
   ActivationPage = '/activation',
   UnauthorizedMessage = '/unauthorized',
   RegistrationSuccessMessage = '/registration_success',
   ForgotPasswordMessage = '/forgot_password_message',
   EmailConfirmationMessage = '/email_confirmation/:token'
}
