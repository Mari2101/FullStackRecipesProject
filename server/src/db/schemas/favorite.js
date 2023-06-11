import { Schema } from "mongoose";

const favoriteSchema = new Schema({
  recipeId: Number,
  userId: String,
});

export { favoriteSchema };
