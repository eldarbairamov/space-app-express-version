import { createBrowserRouter } from "react-router-dom";
import { ActivationPage, ForgotPasswordPage, LoginPage, RegistrationPage, ResetPasswordPage, LogoPage } from "@src/page";
import { ErrorMessage, ForgotPasswordMessage, RegistrationSuccessMessage, UnauthorizedMessage } from "@src/component";
import { EmailConfirmationMessage } from "@src/component/Message/Email-Confirmation-Message (non-auth)/Email-Confirmation-Message";

export const UnauthorizedRouter = createBrowserRouter([
   {
      path: "/",
      element: <LogoPage/>,
      errorElement: <ErrorMessage/>,
   },
   {
      path: "/unauthorized",
      element: <UnauthorizedMessage/>,
      errorElement: <ErrorMessage/>,
   },
   {
      path: "/registration",
      element: <RegistrationPage/>,
      errorElement: <ErrorMessage/>,
   },
   {
      path: "/registration_success",
      element: <RegistrationSuccessMessage/>,
      errorElement: <ErrorMessage/>,
   },
   {
      path: "/forgot_password_message",
      element: <ForgotPasswordMessage/>,
      errorElement: <ErrorMessage/>,
   },
   {
      path: "/login",
      element: <LoginPage/>,
      errorElement: <ErrorMessage/>,
   },
   {
      path: "/password_forgot",
      element: <ForgotPasswordPage/>,
      errorElement: <ErrorMessage/>,
   },
   {
      path: "/password_reset/:token",
      element: <ResetPasswordPage/>,
      errorElement: <ErrorMessage/>,
   },
   {
      path: "/activation",
      element: <ActivationPage/>,
      errorElement: <ErrorMessage/>,
   },
   {
      path: "/email_confirmation/:token",
      element: <EmailConfirmationMessage/>,
      errorElement: <ErrorMessage/>,
   },
]);
