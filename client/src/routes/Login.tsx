import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LoginFormType } from "../types/@types";
import AuthContext from "../context/AuthContext";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ColorRing } from "react-loader-spinner";
import authService from "../services/auth.service";

import c from "./login.module.scss";

const Login = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
  const { isLoggedIn, login } = useContext(AuthContext);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Must be a valid email").required(),
    password: Yup.string().min(3, "Password is too short").required(),
  });
  const handleLogin = (formValues: LoginFormType) => {
    setIsLoading(true);

    const { email, password } = formValues;
    authService
      .login(email, password)
      .then((res) => {
        console.log(res);
        const token = res.accessToken;
        const email = res.email;
        const username = res.username;
        const id = res.id;
        const role = res.roles[0];
        console.log(role);

        login(username, email, token, role, id);
        nav("/");
      })
      .catch((e) => {
        console.log(e);
        alert(e);
        setErrMessage(JSON.stringify(e.response.data));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className={c.loginDiv}>
      <h2>Login</h2>
      {errMessage && <div>${errMessage}</div>}

      {isLoading && (
        <div className="mx-auto w-25">
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
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        <Form className="w-50 mx-auto">
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
            <p>
              Not Registered?{" "}
              <a className={c.regBtn} href="/register">
                TO REGISTER
              </a>
            </p>
            <button
              disabled={isLoading}
              className="btn btn-warning"
              type="submit"
            >
              Login
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
