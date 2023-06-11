import { useState, useContext } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse,
} from "mdb-react-ui-kit";
import MainLogo from "../../images/cooking.png";
import c from "./navbar.module.scss";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { logout } from "../../services/auth.service";

const NavbarComp = () => {
  const { isLoggedIn, role } = useContext(AuthContext);
  const [showNavSecond, setShowNavSecond] = useState(false);
  const auth = localStorage.getItem("user");
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <MDBNavbar className={c.bar} expand="lg" dark bgColor="dark">
        <MDBContainer fluid>
          <NavLink to="/">
            <img
              className={c.MainLogo}
              src={MainLogo}
              alt="Main logo of the website: smiling pot"
            />
          </NavLink>

          <MDBNavbarToggler
            style={{ marginRight: "20px" }}
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavSecond(!showNavSecond)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavSecond}>
            <MDBNavbarNav id={c.navItems}>
              <MDBNavbarLink
                className={c.link}
                active
                aria-current="page"
                href={"/"}
              >
                Home
              </MDBNavbarLink>

              <MDBNavbarLink className={c.link} href={"/about"}>
                About
              </MDBNavbarLink>

              <MDBNavbarLink className={c.link} href={"/recipes"}>
                Recipes
              </MDBNavbarLink>
              {role === "ROLE_ADMIN" && (
                <MDBNavbarLink className={c.link} href={"/shopping-list"}>
                  Shopping List
                </MDBNavbarLink>
              )}
              {isLoggedIn && (
                <MDBNavbarLink className={c.link} href={"/favorites"}>
                  Favorites
                </MDBNavbarLink>
              )}
              {!isLoggedIn && (
                <MDBNavbarLink className={c.link} href={"/login"}>
                  Login/Register
                </MDBNavbarLink>
              )}
              {isLoggedIn && (
                <MDBNavbarLink
                  className={c.link}
                  href={"/login"}
                  onClick={() => handleLogout()}
                >
                  Logout
                </MDBNavbarLink>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default NavbarComp;
