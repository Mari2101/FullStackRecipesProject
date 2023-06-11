import c from "./recipeDetails.module.scss";
import Card from "react-bootstrap/Card";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Recipe } from "../../types/recipes";
import Spinner from "../loaderSpinner/Spinner";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FavoritesContext } from "../../context/FavoritesContext";
import AuthContext from "../../context/AuthContext";
import defaultImage from "../../images/defaultImage.jpg";
import { env } from "process";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState<Recipe>();
  const { name } = useParams();
  const navigate = useNavigate();
  const heartStyle = { color: "rgb(229, 7, 7)" };
  const [isFavorite, setIsFavorite] = useState(false);
  const { loadFavorites, favorites } = useContext(FavoritesContext);
  const { isLoggedIn } = useContext(AuthContext);
  const userinfo: any = localStorage.getItem("user");
  const localId = JSON.parse(userinfo)?.id;

  const filterFavorite = () => {
    setTimeout(() => {
      const filtered = favorites.filter((item) => {
        return item.recipeId === Number(name);
      });
      const filteredId = filtered[0]?.recipeId;
      if (filteredId === Number(name)) {
        setIsFavorite(true);
      }
    }, 200);
  };
  const addFavorite = async (
    userID: string,
    recipeID: number
  ): Promise<void> => {
    try {
      const recipeData = { userId: userID, recipeId: recipeID };
      await axios.post("http://localhost:3006/favorites/add", {
        recipeData,
      });
      setIsFavorite(true);
    } catch (error) {
      console.error("Failed to add favorite:", error);
    }
  };
  const removeFavorite = async (
    userId: string,
    recipeId: number
  ): Promise<void> => {
    try {
      await axios.delete("http://localhost:3006/favorites/remove", {
        data: { userId, recipeId },
      });
      setIsFavorite(false);
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };
  useEffect(() => {
    console.log(process.env);

    loadFavorites(localId);
    const fetchRecipe = async () => {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      setRecipe(response.data);
    };

    fetchRecipe();
    setTimeout(() => {
      filterFavorite();
    }, 200);
  }, []);

  if (!recipe) {
    return <Spinner />;
  }
  return (
    <div id={c.details}>
      <Card key={recipe.id} id={c.card}>
        <Card.Img
          variant="top"
          src={recipe.image ?? defaultImage}
          alt={recipe.title}
        />
        <h2 id={c.detailsTitle}>{recipe.title}</h2>

        {isLoggedIn && isFavorite && (
          <button
            onClick={() => removeFavorite(localId, recipe.id)}
            style={{
              textAlign: "center",
              border: "none",
              width: "60px",
              backgroundColor: "#d9dcea",
            }}
          >
            <FaHeart style={heartStyle} />{" "}
          </button>
        )}
        {isLoggedIn && !isFavorite && (
          <button
            onClick={() => addFavorite(localId, recipe.id)}
            style={{
              textAlign: "center",
              border: "none",
              width: "60px",
              backgroundColor: "#d9dcea",
            }}
          >
            <FaRegHeart style={heartStyle} />{" "}
          </button>
        )}

        <h4>Servings: {recipe.servings}. </h4>
        <h4>Preparation time: {recipe.readyInMinutes} min.</h4>

        <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
        <h5>Ingredients</h5>
        <ul>
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
        <h5>Instructions</h5>
        <p dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>

        <button id={c.btnBack} className="btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </Card>
    </div>
  );
};

export default RecipeDetails;
