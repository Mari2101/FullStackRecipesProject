import { useEffect, useState } from "react";
import styled from "styled-components";
import "@splidejs/react-splide/css/sea-green";
import c from "./popular.module.scss";
import defaultImage from "../../images/defaultImage.jpg";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Recipe } from "../../types/recipes";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Popular = () => {
  const [popular, setPopular] = useState<Recipe[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getRandom();
  }, []);
  const getRandom = async () => {
    const api_key = "ffbf23b8f5644d30ba0638e596c8db5f";
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`
    );
    const data = await api.json();

    setPopular(data.recipes);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/recipes/${recipe.id}`);
  };
  return (
    <div id={c.recipesDiv}>
      <Wrapper>
        <h3>Popular Picks</h3>{" "}
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
          {popular.map((recipe: Recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card id={c.Mycard}>
                  <h6>{recipe.title}</h6>
                  <img src={recipe.image ?? defaultImage} alt={recipe.title} />
                  <button
                    id={c.btnDetails}
                    onClick={() => {
                      handleRecipeClick(recipe);
                    }}
                  >
                    View Details
                  </button>
                </Card>{" "}
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0 rem;
`;

export default Popular;
