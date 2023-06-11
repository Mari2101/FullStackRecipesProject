import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { RegisterFormType } from "../types/@types";
import AuthContext from "../context/AuthContext";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ColorRing } from "react-loader-spinner";
import authService from "../services/auth.service";
import c from "./register.module.scss";

const Register = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
  const { isLoggedIn } = useContext(AuthContext);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Name is too short").required(),
    email: Yup.string().email("Must be a valid email").required(),
    password: Yup.string()
      .min(
        8,
        "Password is too short. Must be minimum 8 symbols, at least: 1 uppercase letter, 1 lowercase letter, 1 number and 1 special symbol"
      )
      .required(),
  });

  const handleRegister = (formValues: RegisterFormType) => {
    setIsLoading(true);

    const { username, email, password } = formValues;
    authService
      .register(username, email, password)
      .then((res) => {
        console.log(res.data);
        nav("/login");
      })
      .catch((e) => {
        console.log(e);
        alert(e);
        setErrMessage(JSON.stringify(e.response.data.message));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className={c.regDiv}>
      <h2>Register</h2>
      {errMessage && <div>${errMessage}</div>}
      {isLoading && (
        <div id={c.innerDiv} className="mx-auto w-25">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{ margin: "0 auto" }}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={handleRegister}
        validationSchema={validationSchema}
      >
        <Form className="w-50 mx-auto">
          <div>
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <Field
              name="username"
              type="text"
              className="form-control"
              id="username"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="alert alert-danger"
            />
          </div>
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field
              name="email"
              type="email"
              className="form-control"
              id="email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="alert alert-danger"
            />
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="form-control"
              id="password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="alert alert-danger"
            />
          </div>
          <div className="col-12">
            <button
              disabled={isLoading}
              className="btn btn-primary"
              type="submit"
            >
              Register
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
