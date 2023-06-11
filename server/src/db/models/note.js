import { model } from "mongoose";
import { noteSchema } from "../schemas/note.js";
const Note = model("Note", noteSchema);

export { Note };
