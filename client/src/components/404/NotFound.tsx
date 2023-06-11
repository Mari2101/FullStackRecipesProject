import { Link } from "react-router-dom";
import c from "./notFound.module.scss";

export default function NotFound() {
  return (
    <div className={c.notFoundComponent}>
      <img
        id={c.err}
        src="https://img.freepik.com/free-vector/oops-404-error-with-a-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1682627248~exp=1682627848~hmac=889f7ffee5623176f6b3949eab984f995eae9e4c3814e75de9d7ac5058e12de1"
        alt="Page not Found"
      />
      <h1 style={{ textAlign: "center" }}>Oops! You seem to be lost...</h1>
      <p>Here are some helpful links:</p>
      <div className={c.btns}>
        <Link id={c.optionBtn} className="btn btn-light" to="/">
          Home
        </Link>
        <Link id={c.optionBtn} className="btn btn-light" to="/about">
          About
        </Link>
        <Link id={c.optionBtn} className="btn btn-light" to="/recipes">
          Recipes
        </Link>
      </div>
      <div id={c.flaticon}>
        <a href="https://ru.freepik.com/free-vector/oops-404-error-with-a-broken-robot-concept-illustration_13315300.htm#query=404&position=0&from_view=keyword&track=robertav1_2_sidr">
          Image from storyset
        </a>{" "}
        created by Freepik
      </div>
    </div>
  );
}
