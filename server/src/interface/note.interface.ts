import { NoteDocument } from "@src/model";

export interface INoteResponse {
   readonly id: NoteDocument["id"];
   readonly title: string;
   readonly body: string;
   readonly lastModified: number;
}

export interface INotesResponse {
   readonly data: INoteResponse[];
   readonly count: number;
}

export interface IUpdateNote {
   readonly title: string;
   readonly body: string;
}