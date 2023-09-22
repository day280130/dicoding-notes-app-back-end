import { notes } from "@src/notes.js";
import type { Payload, ReqHandler } from "@src/types.js";
import { randomUUID } from "crypto";

const addNote: ReqHandler = (req, h) => {
  const { title, body, tags } = req.payload as Payload;

  const id = randomUUID();
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter(note => note.id === id).length > 0;

  return h
    .response({
      status: isSuccess ? "success" : "fail",
      message: isSuccess ? "Catatan berhasil ditambahkan" : "Catatan gagal ditambahkan",
      data: isSuccess ? { noteId: id } : undefined,
    })
    .code(isSuccess ? 201 : 500);
};

const getNotes: ReqHandler = () => ({
  status: "success",
  data: { notes },
});

const getNote: ReqHandler = (req, h) => {
  const { id = "" } = req.params;

  const note = notes.filter(note => note.id === id)[0];

  return h
    .response({
      status: note ? "success" : "fail",
      message: !note ? "Catatan tidak ditemukan" : undefined,
      data: note ? { note } : undefined,
    })
    .code(note ? 200 : 404);
};

const editNote: ReqHandler = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload as Payload;
  const updatedAt = new Date().toISOString();

  const noteIndex = notes.findIndex(note => note.id === id);

  if (noteIndex < 0)
    return h.response({ status: "fail", message: "Gagal memperbarui catatan. Id tidak ditemukan" }).code(404);

  notes[noteIndex] = {
    ...notes[noteIndex],
    title,
    tags,
    body,
    updatedAt,
  };

  return h
    .response({
      status: "success",
      message: "Catatan berhasil diperbarui",
    })
    .code(200);
};

const deleteNote: ReqHandler = (req, h) => {
  const { id } = req.params;

  const noteIndex = notes.findIndex(note => note.id === id);

  if (noteIndex < 0)
    return h.response({ status: "fail", message: "Catatan gagal dihapus. Id tidak ditemukan" }).code(404);

  notes.splice(noteIndex, 1);

  return h
    .response({
      status: "success",
      message: "Catatan berhasil dihapus",
    })
    .code(200);
};

export const noteHandlers = {
  addNote,
  getNotes,
  getNote,
  editNote,
  deleteNote,
} as const;
