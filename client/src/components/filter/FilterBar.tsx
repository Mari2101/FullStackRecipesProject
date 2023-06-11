import { useState } from "react";
import { Accordion } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiFillFilter } from "react-icons/ai";
import c from "./filterbar.module.scss";
import { Link } from "react-router-dom";
const FilterBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div id={c.filterBar}>
        <Button id={c.filterBtn} variant="light" onClick={handleShow}>
          Filter
          <AiFillFilter style={{ width: "30px", color: "#9ea2e3" }} />
        </Button>
      </div>
      <Offcanvas id={c.header} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter By:</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Cuisines:</Accordion.Header>
              <Accordion.Body>
                <div id={c.accordeonBody}>
                  <Link to={"/recipes/cuisine/american"}>American</Link>
                  <Link to={"/recipes/cuisine/chinese"}>Chinese</Link>
                  <Link to={"/recipes/cuisine/french"}>French</Link>
                  <Link to={"/recipes/cuisine/greek"}>Greek</Link>
                  <Link to={"/recipes/cuisine/italian"}>Italian</Link>
                  <Link to={"/recipes/cuisine/japanese"}>Japanese</Link>
                  <Link to={"/recipes/cuisine/jewish"}>Jewish</Link>
                  <Link to={"/recipes/cuisine/thai"}>Thai</Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Diets:</Accordion.Header>
              <Accordion.Body>
                <div id={c.accordeonBody}>
                  <Link to={"/recipes/diets/gluten"}>Gluten Free</Link>
                  <Link to={"/recipes/diets/keto"}>Keto</Link>
                  <Link to={"/recipes/diets/vegetarian"}>Vegetarian</Link>
                  <Link to={"/recipes/diets/vegan"}>Vegan</Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FilterBar;
