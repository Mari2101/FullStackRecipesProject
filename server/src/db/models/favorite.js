import { model } from "mongoose";
import { favoriteSchema } from "../schemas/favorite.js";
const Favorites = model("favorites", favoriteSchema);

export { Favorites };
