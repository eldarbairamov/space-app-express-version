import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlan, IPlans } from "@src/interface";

interface IPlanInitialState {
   searchKey: string;
   plans: IPlan[];
   activePlan: IPlan;
   limit: number;
   total: number;
   count: number;
   isLoading: boolean;
}

const initialState: IPlanInitialState = {
   plans: [],
   searchKey: "",
   activePlan: {} as IPlan,
   limit: 30,
   total: 30,
   count: 0,
   isLoading: false,
};

const planSlice = createSlice({
   name: "plan",
   initialState: initialState,
   reducers: {

      deletePlan: (state, { payload }: PayloadAction<string>) => {
         state.plans = state.plans.filter(plan => plan.id !== payload);
      },

      addPlan: (state, { payload }: PayloadAction<IPlan>) => {
         state.plans.push(payload);
         state.plans = state.plans.sort((a, b) => b.lastModified - a.lastModified);
      },

      setPlans: (state, { payload }: PayloadAction<IPlans>) => {
         state.plans = payload.data;
         state.count = payload.count;
      },

      setSearchKey: (state, { payload }: PayloadAction<string>) => {
         state.searchKey = payload;
      },

      setActivePlan: (state, { payload }: PayloadAction<IPlan>) => {
         state.activePlan = payload;
      },

      updateTitle: (state, { payload }: PayloadAction<string>) => {
         state.activePlan.title = payload;
         state.activePlan.lastModified = Date.now();
         state.plans = state.plans.map(p => {
            if (p.id === state.activePlan.id) {
               p.title = payload;
               return p;
            }
            return p;
         });
      },

      setIsLoading: (state, { payload }) => {
         state.isLoading = payload;
      },

      next: (state) => {
         if (state.total <= state.count) {
            state.total = state.total + state.limit;
         }
      },

   },

});

export const planReducer = planSlice.reducer;
export const planAction = planSlice.actions;
