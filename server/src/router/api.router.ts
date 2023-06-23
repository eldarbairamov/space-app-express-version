import { Router } from "express";
import { planRouter } from "@src/router/plan.router";
import { userRouter } from "@src/router/user.router";
import { notesRouter } from "@src/router/note.router";
import { taskRouter } from "@src/router/task.router";
import { authRouter } from "@src/router/auth.router";
import { momentRouter } from "@src/router/moment.router";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/notes", notesRouter);
apiRouter.use("/plans", planRouter);
apiRouter.use("/tasks", taskRouter);
apiRouter.use("/moments", momentRouter);