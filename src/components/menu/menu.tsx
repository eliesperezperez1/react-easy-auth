import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as Brand } from "../../assets/logowithname.svg";
import MenuIcon from "@mui/icons-material/Menu";
import "./menu.css";
import { useSignOut } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../languageSwitch/languageSwitch";

const Menu = () => {
  const singOut = useSignOut();
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);
  const [t, i18n] = useTranslation();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const logout = () => {
    singOut();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Brand />
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <MenuIcon />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <a
                onClick={() => {
                  navigate("/catalogues");
                }}
              >
                {t("header.inventory")}
              </a>
            </li>
            <li>
            <a
                onClick={() => {
                  navigate("/entities");
                }}
              >
                {t("header.services")}
              </a>
            </li>
            <li>
              <NavLink to="/projects">{t("header.users")}</NavLink>
            </li>
            <li>
              <a onClick={logout}>
                <div>{t("header.logout")}</div>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ChangeLanguage />
        </div>
      </div>
    </nav>
  );
};

export default Menu;
