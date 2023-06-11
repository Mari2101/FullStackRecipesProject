import "./App.css";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Login from "./routes/Login";
import Register from "./routes/Register";
import RecipesBook from "./pages/recipesBook/RecipesBook";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Favorites from "./pages/favorites/Favorites";
import About from "./components/about/About";
import RecipeDetails from "./components/recipedetails/RecipeDetails";
import ShoppingLists from "./pages/shoppingList/ShoppingLists";
import Searched from "./pages/searched/Searched";
import Cuisine from "./components/filter/cuisine/Cuisine";
import Diet from "./components/filter/diet/Diet";
import Main from "./pages/main/Main";
import NotFound from "./components/404/NotFound";

function App() {
  const { isLoggedIn, role } = useContext(AuthContext);

  return (
    <div>
      <Navbar />

      <Routes>
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/register" element={<Register />} />}
        <Route path="/recipes" element={<RecipesBook />} />
        <Route path="/recipes/cuisine/:cuisine" element={<Cuisine />}></Route>
        <Route path="/recipes/diets/:diet" element={<Diet />}></Route>
        <Route path="/recipes/:name" element={<RecipeDetails />} />
        <Route path="/about" element={<About />}></Route>
        <Route path="/" element={<Main />}></Route>
        <Route path="/recipes/searched/:search" element={<Searched />}></Route>
        {role === "ROLE_ADMIN" && (
          <Route path="/shopping-list" element={<ShoppingLists />} />
        )}
        {isLoggedIn && (
          <Route path="/favorites" element={<Favorites />}></Route>
        )}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
