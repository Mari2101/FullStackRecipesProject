import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import c from "./footer.module.scss";
export default function FooterComp() {
  return (
    <MDBFooter bgColor="dark" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-center p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span id={c.footer_span}>
            Get connected with us on social networks:
          </span>
        </div>

        <div>
          <a
            id={c.footer_link}
            href="https://www.facebook.com/"
            className="me-4 text-reset"
          >
            <FaFacebookSquare id={c.icon} />
          </a>
          <a
            id={c.footer_link}
            href="https://www.twitter.com/"
            className="me-4 text-reset"
          >
            <FaTwitterSquare id={c.icon} />
          </a>
          <a
            id={c.footer_link}
            href="https://www.google.com/"
            className="me-4 text-reset"
          >
            <AiFillGoogleCircle id={c.icon} />
          </a>
          <a href="https://www.instagram.com/" className="me-4 text-reset">
            <FaInstagramSquare id={c.icon} />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4" id={c.footer_link}>
                <MDBIcon icon="gem" className="me-3" />
                Smart Cooking
              </h6>
              <p>
                <a
                  id={c.footer_link}
                  href="https://www.flaticon.com/free-icons/cooking"
                  title="cooking icons"
                >
                  Cooking icons created by Freepik - Flaticon
                </a>
              </p>
            </MDBCol>

            <MDBCol
              md="2"
              lg="2"
              xl="2"
              id={c.main_pages}
              className="mx-auto mb-4 "
            >
              <h6 className="text-uppercase fw-bold mb-4" id={c.footer_link}>
                Main Pages
              </h6>
              <p>
                <Link to="/" className="text-reset">
                  About
                </Link>
              </p>
              <p>
                <Link to="/recipes" className="text-reset">
                  Recipes Book
                </Link>
              </p>

              <p>
                <Link to="/login" className="text-reset">
                  Login/Register
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4" id={c.footer_link}>
                Contact
              </h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Jerusalem, 10012, Israel
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                SmartCooking@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 Copyright: Mari Iobashvili
      </div>
    </MDBFooter>
  );
}
