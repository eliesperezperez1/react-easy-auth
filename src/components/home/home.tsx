import axios from "axios";
import { Button } from "baseui/button";
import { HeadingXXLarge } from "baseui/typography";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Container } from "../commons";
import { useTranslation } from "react-i18next";

function Home() {
  const singOut = useSignOut();
  const navigate = useNavigate();
  const [t, i18n] = useTranslation();

  const logout = () => {
    singOut();
    navigate("/login");
  };

  const getPayment = async () => {
    const response = await axios.get("http://localhost:9000/api/v1/payment", {
      withCredentials: true,
    });
  };

  return (
    <Container>
      <HeadingXXLarge color="secondary500">{t("home.welcome")}</HeadingXXLarge>
      <Button kind="secondary" onClick={getPayment}>
      {t("home.getPayment")}
      </Button>
      <Button kind="secondary" onClick={logout}>
      {t("header.logout")}
      </Button>
    </Container>
  );
}

export { Home };
