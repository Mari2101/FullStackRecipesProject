import c from "./spinner.module.scss";
import { MDBSpinner } from "mdb-react-ui-kit";
const Spinner = () => {
  return (
    <div id={c.spinner}>
      <MDBSpinner grow color="primary">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
      <MDBSpinner grow className="mx-2" color="warning">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
      <MDBSpinner grow color="success">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>

      <MDBSpinner grow className="mx-2" color="info">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
};

export default Spinner;
