import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { ReactComponent as Brand } from "../../assets/logowithname.svg";
import MenuIcon from "@mui/icons-material/Menu";
import "./menu.css";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import ChangeLanguage, {
  ChangeLanguageProps,
} from "../language-switch/language-switch";
import { ROLE } from "../../utils/enums/role.enum";
import { userMock } from "../../utils/user.mock";
import { User } from "../../interfaces/user.interface";
export interface ChangeLanguageEvent {
  change: () => void;
}
const Menu = (props: { change: ChangeLanguageEvent }) => {
  const singOut = useSignOut();
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);
  const [t, i18n] = useTranslation();
  const user = useAuthUser();
  const [userData, setUserData] = useState<User>(userMock);
  const change: ChangeLanguageProps = {
    changeComponentsLanguage: () => sendToApp(),
  };
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const logout = () => {
    singOut();
    navigate("/login");
  };

  const sendToApp = () => {
    props.change.change();
  };
  useEffect(() => {
    setUserData(user()?.user);
  });
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
            {userData.role !== ROLE.VIEWER ? (
              <>
                <li>
                  <a
                    onClick={() => {
                      navigate("/users");
                    }}
                  >
                    {t("header.users")}
                  </a>
                </li>
              </>
            ) : (
              <></>
            )}

            <li>
              <a onClick={logout}>
                <div>{t("header.logout")}</div>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ChangeLanguage change={change} />
        </div>
      </div>
    </nav>
  );
};

export default Menu;
