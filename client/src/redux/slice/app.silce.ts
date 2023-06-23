import { createSlice } from "@reduxjs/toolkit";
import { IS_DARK } from "@src/constant";

export interface IInitialState {
   isDark: boolean;
}

const initialState: IInitialState = {
   isDark: localStorage.getItem(IS_DARK) === "true",
};

const appSlice = createSlice({
   name: "app",
   initialState,
   reducers: {
      switchTheme: (state, { payload }) => {
         state.isDark = payload;
         localStorage.setItem(IS_DARK, String(payload));
      },
   },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
