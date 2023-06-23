import expressAsyncHandler from "express-async-handler";
import { Response } from "express";
import { addNoteService, deleteNoteService, getNotesService, updateNoteService } from "@src/service";
import { IDeleteItemBody, IQuery } from "@src/interface/common.interface";
import { INoteResponse, INotesResponse, IRequest, IUpdateNote } from "@src/interface";
import { getNoteService } from "@src/service/note/get-note.service";

export const notesController = {

   addNote: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response<INoteResponse>) => {
      const note = await addNoteService(req.userId);
      res.status(201).json(note);
   }),

   getNote: expressAsyncHandler(async (req: IRequest<any, { noteId: string }, any>, res: Response<INoteResponse>) => {
      const note = await getNoteService(req.params.noteId);
      res.json(note);
   }),

   getNotes: expressAsyncHandler(async (req: IRequest<any, any, IQuery>, res: Response<INotesResponse>) => {
      const notes = await getNotesService(req.userId, req.query);
      res.json(notes);
   }),

   updateNote: expressAsyncHandler(async (req: IRequest<IUpdateNote, { noteId: string }, any>, res: Response<{ message: string }>) => {
      await updateNoteService(req.params.noteId, req.body);
      res.json({ message: "Success" });
   }),

   deleteNote: (expressAsyncHandler(async (req: IRequest<IDeleteItemBody, { noteId: string }, any | IQuery>, res: Response<INotesResponse>) => {
      const notes = await deleteNoteService(req.params.noteId, req.userId, req.query);
      res.json(notes);
   })),

};
