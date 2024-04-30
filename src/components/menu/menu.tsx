import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Brand } from "../../assets/logowithname.svg";
import { ReactComponent as BrandWhite } from "../../assets/logowhitewithname.svg";
import MenuIcon from "@mui/icons-material/Menu";
import "./menu.css";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../language-switch/language-switch";
import { ROLE } from "../../utils/enums/role.enum";
import { userMock } from "../../utils/user.mock";
import { User } from "../../interfaces/user.interface";
import DarkModeSwitch from "../darkModeSwitch/darkModeSwitch";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
export interface ChangeLanguageEvent {
  change: () => void;
}
const Menu = (props: { change: ChangeLanguageEvent }) => {
  const singOut = useSignOut();
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);
  const [t, i18n] = useTranslation();
  const user = useAuthUser();
  const { actualTheme } = useAlternateTheme();
  const [userData, setUserData] = useState<User>(userMock);

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
  const dynamicStyle = {
    //backgroundColor: userData.themeApp === 'light' ? 'white' : 'black',
    //color: userData.themeApp === 'light' ? 'black' : 'white',
    backgroundColor: actualTheme === "light" ? "white" : "#252525",
    color: actualTheme === "light" ? "#252525" : "white",
  };
  useEffect(() => {
    setUserData(user().user);
  });
  return (
    <nav className="navbar" style={dynamicStyle}>
      <div className="container" style={dynamicStyle}>
        <div className="logo">
          {userData.themeApp === "light" ? <Brand /> : <BrandWhite />}
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <MenuIcon />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`} style={dynamicStyle}>
          <ul style={dynamicStyle}>
            <li style={dynamicStyle}>
              <a style={dynamicStyle}
                onClick={() => {
                  navigate("/catalogues");
                }}
              >
                {t("header.inventory")}
              </a>
            </li>
            <li>
              <a style={dynamicStyle}
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
                  <a style={dynamicStyle}
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
              <a style={dynamicStyle} onClick={logout}>
                <div>{t("header.logout")}</div>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <DarkModeSwitch />
          <ChangeLanguage />
        </div>
      </div>
    </nav>
  );
};

export default Menu;
