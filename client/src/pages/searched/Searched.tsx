import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import defaultImage from "../../images/defaultImage.jpg";
import { Link, useParams } from "react-router-dom";
import { Recipe } from "../../types/recipes";
import c from "./searched.module.scss";
import SearchBar from "../../components/searchbar/SearchBar";
const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();
  const getSearched = async (name: string | undefined) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=9&query=${name}`
    );
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);
  };
  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);
  return (
    <>
      <SearchBar />

      <div id={c.searchedDiv}>
        {searchedRecipes.map((recipe: Recipe) => {
          return (
            <Link id={c.searchedItem} to={`/recipes/${recipe.id}`}>
              <Card key={recipe.id} id={c.myCard}>
                <h6 id={c.searchedRecipeTitle}>{recipe.title}</h6>
                <img src={recipe.image ?? defaultImage} alt={recipe.title} />
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Searched;
