import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { AuthUser } from "../../interfaces/user.interface";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const authUser = useAuthUser();
  const aux = authUser() as unknown as AuthUser;
  const { user, id } = aux;
  const [t, i18n] = useTranslation();

  return (
    <>
      <h2>
        {user.name}
        {user.surname}
        {id}
      </h2>
      <h2>{authHeader()}</h2>
      <button onClick={() => navigate("/catalogues")}>{t("dashboard.goToCatalogs")}</button>
    </>
  );
}

export { Dashboard };
