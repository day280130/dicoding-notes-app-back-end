import type { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { noteHandlers } from "@src/handler.js";

export const routes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: "POST",
    path: "/notes",
    handler: noteHandlers.addNote,
  },
  {
    method: "GET",
    path: "/notes",
    handler: noteHandlers.getNotes,
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: noteHandlers.getNote,
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: noteHandlers.editNote,
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: noteHandlers.deleteNote,
  },
];
