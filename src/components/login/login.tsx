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
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../utils/constants";
import "./login.css";
import Snackbar from "@mui/material/Snackbar";
import { ReactComponent as Logo } from "../../assets/logo70.svg";
import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../language-switch/language-switch";

function Login(props: any) {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [t, i18n] = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
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
      console.log("Error: ", err);
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
            </Button>
          </InputWrapper>
        </form>
      </InnerContainer>
    </Container>
  );
}

export { Login };
