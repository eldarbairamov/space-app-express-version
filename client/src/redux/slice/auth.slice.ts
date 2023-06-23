import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storageService } from "@src/service";

interface IInitialState {
   isLogin: boolean
}

const initialState: IInitialState = {
   isLogin: !!storageService.getAccessToken()
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setIsLogin: (state, { payload }: PayloadAction<boolean>) => {
         state.isLogin = payload
      }
   },
})

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
