import c from "./about.module.scss";
import cookbook from "../../images/recipe.png";
const About = () => {
  return (
    <div className={c.aboutDiv}>
      <h2 className="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <img src={cookbook} alt="Cooking Book Logo" />
        About
      </h2>
      <p>
        Welcome to Smart Cooking Website! <br /> <br /> Enjoy variety of recipes
        for everyday life, parties or holidays. Are you vegetarian? Want to
        loose weight? Interested in Keto Diet? Or looking for rare recipes?{" "}
        <br /> <br />
        In this website you will definetely find any recipe you are searching
        for. You also have option to create your personal recipes e-book - save
        your own recipes and/or add favorite recipes from our collection to your
        personal e-book as well. Enjoy your cooking!
      </p>
    </div>
  );
};

export default About;
