import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import {
  fetchNote,
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./controllers/notesController.js";
import { notFound } from "./middleware/not-found.js";
import { connect } from "./db/connect.js";
import { authRouter } from "./routes/users.js";
import { Favorites } from "./db/models/favorite.js";

const app = express();

connect().catch((e) => {
  console.log(e);
});

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.get("/notes", fetchNotes);
app.get("/notes/:id", fetchNote);
app.post("/notes", createNote);
app.put("/notes/:id", updateNote);
app.delete("/notes/:id", deleteNote);

app.post("/favorites/add", (req, res) => {
  const userId = req.body.recipeData.userId;
  const recipeId = req.body.recipeData.recipeId;

  console.log(userId, recipeId);
  const favorites = new Favorites({ userId, recipeId });
  favorites
    .save()
    .then(() => {
      console.log("Recipe ID added to favorites for user:", userId);
      res.status(200).json({ message: "Recipe ID added to favorites" });
    })
    .catch((err) => {
      console.error("Failed to add recipe ID to favorites:", err);
      res.status(500).json({ error: "Failed to add recipe ID to favorites" });
    });
});

app.delete("/favorites/remove", (req, res) => {
  const { userId, recipeId } = req.body;

  Favorites.findOneAndDelete({ userId, recipeId })
    .then(() => {
      console.log("Recipe ID removed from favorites for user:", userId);
      res.status(200).json({ message: "Recipe ID removed from favorites" });
    })
    .catch((err) => {
      console.error("Failed to remove recipe ID from favorites:", err);
      res
        .status(500)
        .json({ error: "Failed to remove recipe ID from favorites" });
    });
});

app.get("/favorites/:userId", async (req, res) => {
  const Id = req.params.userId;
  const recipeId = req.params.recipeId;

  await Favorites.find({ userId: { $eq: Id } })
    .then((favorites) => {
      console.log("Favorite recipes retrieved for user:", Id);
      res.status(200).json({ favorites });
    })
    .catch((err) => {
      console.error("Failed to retrieve favorite recipes:", err);
      res.status(500).json({ error: "Failed to retrieve favorite recipes" });
    });
});
app.use(notFound);

const PORT = 3006;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
