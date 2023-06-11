import { NavLink } from "react-router-dom";
import c from "./main.module.scss";
const Main = () => {
  return (
    <>
      <div id={c.mainDiv}>
        <br />
        <div id={c.headingDiv}>
          <h1 className="shadow-lg p-3 mb-5 rounded" id={c.mainHeader}>
            Make your cooking experience even more enjoyable with "Smart
            Cooking" <br />
            <br />
            <button className="btn-lg btn-danger">
              {" "}
              <NavLink to={"/recipes"}> Explore Recipes </NavLink>
            </button>
          </h1>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#d6d7df",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <a
          style={{ textDecoration: "none" }}
          href="https://www.freepik.com/free-photo/tasty-fresh-appetizing-italian-food-ingredients-dark-background-ready-cook-home-italian-healthy-food-cooking-concept-toning_1349439.htm#query=cooking&position=14&from_view=search&track=sph"
        >
          Image by valeria_aksakova
        </a>{" "}
        on Freepik
      </div>
    </>
  );
};

export default Main;
