import { useState } from "react";
import { useNavigate } from "react-router-dom";
import c from "./searchBar.module.scss";
import { FcSearch } from "react-icons/fc";
import FilterBar from "../filter/FilterBar";
const SearchBar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e: any) => {
    e.preventDefault();
    navigate("/recipes/searched/" + input);
  };
  return (
    <form onSubmit={submitHandler} id={c.searchContainer}>
      <div id={c.searchHeading}>
        <h2>
          <FcSearch />
          Search For Recipes:
        </h2>
      </div>
      <input
        type="text"
        value={input}
        id={c.searchInput}
        onChange={(e) => setInput(e.target.value)}
      />
      <FilterBar />
    </form>
  );
};

export default SearchBar;
