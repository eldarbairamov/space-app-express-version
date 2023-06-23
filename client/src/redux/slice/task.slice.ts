import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "@src/interface";

interface ITaskInitialState {
   searchKey: string;
   tasks: ITask[];
   isLoading: boolean;
}

const initialState: ITaskInitialState = {
   tasks: [],
   searchKey: "",
   isLoading: false
};

const taskSlice = createSlice({
   name: "task",
   initialState: initialState,
   reducers: {

      deleteTask: (state, { payload }: PayloadAction<string>) => {
         state.tasks = state.tasks.filter(task => task.id !== payload);
      },

      addTask: (state, { payload }: PayloadAction<ITask>) => {
         state.tasks.push(payload);
      },

      setTasks: (state, { payload }: PayloadAction<ITask[]>) => {
         state.tasks = payload;
      },

      setSearchKey: (state, { payload }: PayloadAction<string>) => {
         state.searchKey = payload;
      },

      updateTask: (state, { payload }: PayloadAction<string>) => {
         const task = state.tasks.find(item => item.id === payload) as ITask;
         task.isCompleted = !task.isCompleted;
      },

      setIsLoading: (state, { payload }) => {
         state.isLoading = payload;
      },

   },

});

export const taskReducer = taskSlice.reducer;
export const taskAction = taskSlice.actions;
