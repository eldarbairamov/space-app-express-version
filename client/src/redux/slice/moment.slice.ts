import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMoment, IMoments } from "@src/interface";

interface IMomentInitialState {
   moments: IMoment[];
   activeMoment: IMoment;
   searchKey: string;
   tags: (string | undefined)[];
   count: number;
   limit: number;
   total: number;
   isLoading: boolean;
}

const initialState: IMomentInitialState = {
   moments: [],
   activeMoment: {} as IMoment,
   searchKey: "",
   tags: [],
   count: 0,
   limit: 30,
   total: 30,
   isLoading: false
};

const momentSlice = createSlice({
   name: "moment",
   initialState,
   reducers: {

      setMoments: (state, { payload }: PayloadAction<IMoments>) => {
         state.activeMoment = {} as IMoment;
         state.moments = payload.data;
         state.tags = payload.tagsForFilter;
         state.count = payload.count;
      },

      addMoment: (state, { payload }: PayloadAction<IMoment>) => {
         state.moments.push(payload);
         state.moments = state.moments.sort((a, b) => b.createdAt - a.createdAt);
         state.tags.push(payload.tag)
         state.tags = Array.from(new Set(state.tags.flat()))
      },

      deleteMoment: (state, { payload }: PayloadAction<{ momentId: string }>) => {
         state.moments = state.moments.filter(moment => moment.id !== payload.momentId);
      },

      setActiveMoment: (state, { payload }: PayloadAction<IMoment>) => {
         state.activeMoment = payload;
      },

      setSearchKey: (state, { payload }: PayloadAction<string>) => {
         state.searchKey = payload;
      },

      setDate: (state, { payload }: PayloadAction<number>) => {
         state.activeMoment!.date = payload;
      },

      editTag: (state, { payload }: PayloadAction<string>) => {
         state.activeMoment!.tag = payload
      },

      setPhoto: (state, { payload }: PayloadAction<{ photo: string }>) => {
         state.activeMoment!.photo = payload.photo;
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

export const momentReducer = momentSlice.reducer;
export const momentActions = momentSlice.actions;
