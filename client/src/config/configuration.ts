export const configuration = {
   API_URL: "http://localhost:3010",
}

export const userRequests = {
   profileUpdate: "/user/profile_update",
   changeEmail: "/user/email_change",
   changeEmailAccept: "/user/email_new",
   changePassword: "/user/password_new",
   getUser: "/user/get_user",
   uploadAvatar: "/user/avatar_upload",
   deleteAvatar: "/user/avatar_delete",
};

export const notesRequests = {
   addNote: "/notes/add",
   getNotes: "/notes",
   getNote: "/notes/",
   getNotesCount: "/notes/count",
   saveNote: "/notes/",
   deleteNote: "/notes/",
   getNotesBySearch: "/notes/search",
};

export const plansRequests = {
   addPlan: "/plans/add",
   deletePlan: "/plans/",
   updatePlan: "/plans/",
   getAllPlans: "/plans",
   getPlansCount: "/plans/count",
   getPlansBySearch: "/plans/search",
   getOnePlan: "/plans/",
};

export const momentsRequests = {
   addMoment: "/moments/add",
   deleteMoment: "/moments/",
   updateMoment: "/moments/",
   getAllMoments: "/moments",
   getOneMoment: "/moments/",
   uploadPhoto: "/moments/",
   deletePhoto: "/moments/",
   getMomentsCount: "/moments/count",
   getMomentsByTags: "/moments/filter",
};

export const authRequests = {
   registration: "/auth/registration",
   login: "/auth/login",
   refresh: "/auth/refresh",
   forgotPassword: "auth/password_forgot",
   accountActivation: "/auth/activation",
   resetPassword: "/auth/password_reset",
   logout: "/auth/logout",
};

export const tasksRequests = {
   addTask: "/tasks/add",
   updateTask: "/tasks/",
   deleteTask: "/tasks/",
   getAllTasks: "/tasks",
};
