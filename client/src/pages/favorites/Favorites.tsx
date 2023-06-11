import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Recipe } from "../../types/recipes";
import c from "./favorites.module.scss";
import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import defaultImage from "../../images/defaultImage.jpg";

const Favorites = () => {
  const { loadFavorites, favorites } = useContext(FavoritesContext);
  const [favs, setFavs] = useState<any>([]);
  const [render, setRender] = useState<any>(false);
  const navigate = useNavigate();
  const fetchFavoriteRecipe = () => {
    const ids = favorites
      .map((item) => {
        return item.recipeId;
      })
      .join(",");

    axios
      .get(
        `https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        if (response) {
          setFavs(response.data);
          setRender(true);
        }
      });
  };
  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/recipes/${recipe.id}`);
  };
  useEffect(() => {
    const userinfo: any = localStorage.getItem("user");
    const localId = JSON.parse(userinfo).id;
    loadFavorites(localId);
    fetchFavoriteRecipe();
  }, [render]);

  return (
    <div id={c.favs}>
      <h2>
        Favorites <FaHeart id={c.full} />
      </h2>
      <div id={c.favsContainer}>
        {favs &&
          favs.map((item: any) => (
            <div id={c.favoritesTable} key={item.id}>
              <img
                id={c.favoritesImg}
                style={{ borderRadius: "10%" }}
                src={item.image ?? defaultImage}
                alt={item.title}
              />

              <div id={c.recipeTitle}>{item.title}</div>
              <div id={c.favBtnDiv}>
                <button
                  id={c.favoriteBtnDetails}
                  onClick={() => {
                    handleRecipeClick(item);
                  }}
                  className="btn btn-light"
                >
                  View Full Recipe
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favorites;
