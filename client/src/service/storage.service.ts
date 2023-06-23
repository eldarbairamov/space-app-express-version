import { ACCESS_TOKEN, REFRESH_TOKEN } from "@src/constant";

export const storageService = {

   getAccessToken: () => localStorage.getItem(ACCESS_TOKEN),
   getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN),

   setTokens: (accessToken: string, refreshToken: string) => {
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
   },

   deleteTokens: () => {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
   },

};
