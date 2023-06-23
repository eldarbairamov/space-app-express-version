import { type AxiosApiError } from "../service";

export const errorCatherFn = (e: unknown) => {
   const axiosError = e as AxiosApiError;
   const response = axiosError.response?.data.message;

   let message;

   switch (response) {
      case "Current password is not valid":
         message = "Невірно вказаний поточний пароль";
         break;

      case "This email is already in use":
         message = "Користувач з такою електронною поштою вже існує";
         break;

      case "This username is already in use":
         message = "Це імʼя користувача вже зайняте";
         break;

      case "Account is not activated":
         message = "Активуйте аккаунт";
         break;

      case "Invalid file type":
         message = "Невірний формат файлу";
         break;

      case "Wrong email or password":
         message = "Невірний пароль або електронна пошта";
         break;

      case "File size must be less than 10 mb":
         message = "Розмір файлу не має перевищувати 3МБ";
         break;

      case "Activation code is not valid":
         message = "Невірний код активації";
         break;

      case "User is not found":
         message = "Користувача з такою електронною поштою не існує";
         break;

      case "No such image or directory":
         message = "Непередбачена помилка.. Перезавантажте сторінку";
         break;

      case "Password is already in use":
         message = "Цей пароль вже використовується. Спробуйте інший";
         break;

      case "There is nothing to change":
         message = "Інформація не потребує змін";
         break;

      default:
         message = `Непередбачена помилка: ${ axiosError.message }`;
         break;
   }

   if (Array.isArray(response)) {
      response.forEach(item => {
         if (item.includes("empty")) {
            message = "Поля неповинні залишитись пустими";
         }
      });
   }

   if (response?.includes("empty")) {
      message = "Поля неповинні залишитись пустими";
   }

   return message;
};
