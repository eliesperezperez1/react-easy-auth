import { Button } from "baseui/button";
import {
  Container,
  InnerContainer,
  InputWrapper,
  StyledInput,
  LanguageFlag,
} from "../commons";

import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../utils/constants";
import "./login.css";
import Snackbar from "@mui/material/Snackbar";
import { ReactComponent as Logo } from "../../assets/logo70.svg";
import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../language-switch/language-switch";

/**
 * Renders a login form that allows users to authenticate with the application.
 *
 * @param {any} props - The props passed to the component.
 * @return {JSX.Element} The rendered login form.
 */
function Login(props: any) {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [t, i18n] = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  
  /**
   * Closes the component by setting the open state to false.
   *
   * @return {void} 
   */
  const handleClose = () => {
    setOpen(false);
  };
  
  /**
   * Submits the login form by sending a POST request to the API endpoint
   * "/auth/login" with the provided values. If the request is successful,
   * it signs in the user and navigates to the "/catalogues" page. If the
   * request fails with a status code of 403, it sets an error message
   * indicating that the user was not found. If the request fails with a
   * status code of 203, it sets an error message indicating that the
   * credentials are not correct. If an error occurs during the request,
   * it sets an error message based on the error message received.
   *
   * @param {any} values - The form values to be sent in the request.
   * @return {Promise<void>} - A promise that resolves when the request is
   * completed.
   */
  const onSubmit = async (values: any) => {
    setError("");

    try {
      const response = await fetch(API + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.status === 403) {
        setError("User not found");
        setOpen(true);
      } else if (data.status === 203) {
        setError("Credentials are not correct");
        setOpen(true);
      } else {
        console.log(data);
        signIn({
          token: data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { user: data.user, id: data.id },
        });
        navigate("/catalogues");
      }
    } catch (err) {
      setOpen(true);
      if (err instanceof Error) setError(err.message);
    }
  };

  const formik = useFormik({ 
    initialValues: { 
      email: "", 
      password: "", 
    }, 
    onSubmit, 
  }); 

  return ( 
    <Container>
      <InnerContainer className="inner-container">
        <LanguageFlag>
          <ChangeLanguage />
        </LanguageFlag>
        <form onSubmit={formik.handleSubmit}>
          <div className="logo">
            <Logo />
          </div>
          <InputWrapper>
            <StyledInput
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder={t("login.email")}
              clearOnEscape
              size="large"
              type="email"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder={t("login.password")}
              clearOnEscape
              size="large"
              type="password"
              min={8}
            />
          </InputWrapper>
          <InputWrapper>
            <Button
              className="light-background dark-text"
              size="large"
              kind="primary"
              isLoading={formik.isSubmitting}
            >
              {t("login.botonIniciar")}
            </Button>
            <Snackbar open={open} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{ width: "100%" }}
              >
                {error}
              </Alert>
            </Snackbar>
          </InputWrapper>
        </form>
      </InnerContainer>
    </Container>
  );
}

export { Login };
