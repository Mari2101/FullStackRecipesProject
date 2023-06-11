import { useEffect, useState } from "react";
import styled from "styled-components";
import "@splidejs/react-splide/css/sea-green";
import defaultImage from "../../images/defaultImage.jpg";
import c from "../popular/popular.module.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Recipe } from "../../types/recipes";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Veggie = () => {
  const [veggie, setVeggie]: any = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getVeggie();
  }, []);
  const getVeggie = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10&tags=vegetarian`
    );
    const data = await api.json();

    setVeggie(data.recipes);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/recipes/${recipe.id}`);
  };
  return (
    <div id={c.recipesDiv}>
      <Wrapper>
        <h3>Vegetarian Picks</h3>{" "}
        <Splide
          style={{ padding: "8px" }}
          options={{
            breakpoints: {
              500: { perPage: 1 },
              800: { perPage: 2 },
              1100: { perPage: 3 },
              1400: { perPage: 4 },
              2000: { perPage: 4 },
            },
            gap: "0.5rem",
            arrows: true,
            pagination: false,
            drag: "free",
          }}
        >
          {veggie.map((recipe: Recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card id={c.Mycard}>
                  <h6>{recipe.title}</h6>
                  <img src={recipe.image ?? defaultImage} alt={recipe.title} />
                  <button
                    id={c.btnDetails}
                    onClick={() => handleRecipeClick(recipe)}
                  >
                    View Details
                  </button>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
        <div style={{ backgroundColor: "#d6d7df" }}>
          <a href="https://www.freepik.com/free-vector/recipe-book-concept-illustration_19245712.htm#query=cook%20book&position=3&from_view=search&track=ais">
            Default Recipes Book image by storyset
          </a>{" "}
          on Freepik
        </div>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0 rem;
`;

export default Veggie;
