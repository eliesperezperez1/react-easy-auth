import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Renders the Dashboard component.
 *
 * @return {JSX.Element} The rendered Dashboard component.
 */
function Dashboard() {
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const authUser = useAuthUser();
  const [t, i18n] = useTranslation();

  return (
    <>
      <h2>
      </h2>
      <h2>{authHeader()}</h2>
      <button onClick={() => navigate("/catalogues")}>
        {t("dashboard.goToCatalogs")}
      </button>
    </>
  );
}

export { Dashboard };
