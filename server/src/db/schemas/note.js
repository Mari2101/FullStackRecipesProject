import { Schema } from "mongoose";

const noteSchema = new Schema({
  title: String,
  body: String,
});

export { noteSchema };
