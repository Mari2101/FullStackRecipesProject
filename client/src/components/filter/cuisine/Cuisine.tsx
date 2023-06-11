import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import defaultImage from "../../../images/defaultImage.jpg";
import { Link, useParams } from "react-router-dom";
import { Recipe } from "../../../types/recipes";
import SearchBar from "../../searchbar/SearchBar";
import c from "../filterbar.module.scss";

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();
  const getCuisine = async (cuisine: string | undefined) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${cuisine}&limit=9`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };
  useEffect(() => {
    getCuisine(params.cuisine);
  }, [params.cuisine]);
  return (
    <div>
      <SearchBar />
      {/*   <FilterBar /> */}
      <div id={c.filterContainer}>
        {cuisine.map((recipe: Recipe) => {
          return (
            <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
              <Card id={c.filterCard}>
                <h6>{recipe.title}</h6>
                <img src={recipe.image ?? defaultImage} alt={recipe.title} />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Cuisine;
