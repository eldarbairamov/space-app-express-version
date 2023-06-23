import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INote, INotes } from "@src/interface";

interface INoteInitialState {
   activeNoteId: string;
   notes: INote[];
   activeNote: INote;
   lastNote: INote;
   searchKey: string;
   limit: number;
   total: number;
   count: number;
   isLoading: boolean;
   font: 'Roboto' | "Caveat";
}

const initialState: INoteInitialState = {
   activeNoteId: "",
   notes: [] as INote[],
   activeNote: {} as INote,
   lastNote: {} as INote,
   searchKey: "",
   limit: 30,
   total: 30,
   count: 0,
   isLoading: false,
   font: 'Roboto'
};

const noteSlice = createSlice({
   name: "note",
   initialState,
   reducers: {

      setActiveNoteId: (state, { payload }: PayloadAction<string>) => {
         state.activeNoteId = payload;
         state.activeNote = state.notes.find(({ id }) => id === state.activeNoteId)!;
      },

      setActiveNote: (state, { payload }: PayloadAction<INote>) => {
         state.activeNote = payload
      },

      updateNote: (state, { payload }: PayloadAction<INote>) => {
         state.notes = state.notes.map(note => {
            if (note.id === payload.id) return payload;
            return note;
         });
         state.activeNote = state.notes.find(({ id }) => id === payload.id)!;
         state.notes = state.notes.sort((a, b) => b.lastModified - a.lastModified);
      },

      updateNoteAdaptive: (state, { payload }: PayloadAction<INote>) => {
         state.activeNote = payload
      },

      setDefaultNote: (state, { payload }: PayloadAction<INote>) => {
         state.activeNote = payload;
      },

      setSearchKey: (state, { payload }: PayloadAction<string>) => {
         state.searchKey = payload;
      },

      setNotes: (state, { payload }: PayloadAction<INotes>) => {
         state.notes = payload.data;
         state.activeNote = payload.data[0];
         state.count = payload.count;
      },

      addNote: (state, { payload }: PayloadAction<INote>) => {
         state.notes.push(payload);
         state.notes = state.notes.sort((a, b) => b.lastModified - a.lastModified);
         state.activeNoteId = payload.id;
         state.activeNote = state.notes.find(({ id }) => id === state.activeNoteId)!;
      },

      deleteNote: (state, { payload }: PayloadAction<string>) => {
         const targetId = payload;
         const targetNoteIndex = state.notes.findIndex(item => item.id === targetId);

         state.notes = state.notes.filter(item => item.id !== targetId);
         state.activeNoteId = state.notes[targetNoteIndex] ? state.notes[targetNoteIndex].id : "";
         state.activeNote = state.notes[targetNoteIndex] ? state.notes[targetNoteIndex] : state.notes[targetNoteIndex - 1];
      },

      setIsLoading: (state, { payload }) => {
         state.isLoading = payload;
      },

      next: (state) => {
         if (state.total <= state.count) {
            state.total = state.total + state.limit;
         }
      },

      changeFont: (state, { payload }: PayloadAction<"Roboto" | "Caveat">) => {
         state.font = payload
      }

   },

});

export const noteReducer = noteSlice.reducer;
export const noteActions = noteSlice.actions;
