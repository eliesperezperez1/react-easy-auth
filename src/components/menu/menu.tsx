import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as Brand } from "../../assets/logowithname.svg";
import { ReactComponent as CasImage } from "../../assets/esp.svg";
import { ReactComponent as ValImage } from "../../assets/val.svg";
import MenuIcon from "@mui/icons-material/Menu";
import "./menu.css";
import { useSignOut } from "react-auth-kit";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const singOut = useSignOut();
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);
  const [t, i18n] = useTranslation();
  const [idioma, setIdioma] = useState("es");
  const [imageIndex, setImageIndex] = useState(1);
  const [primerClick, setPrimerClick] = useState(0);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const logout = () => {
    singOut();
    navigate("/login");
  };

  const switchVisibleSeleccion = () => {
    if(idioma==="es"){
      setIdioma("val");
    } 
    else {
      setIdioma("es");
    }
    i18n.changeLanguage(idioma);
    console.log("Idioma al cambiar: "+idioma);
    if(primerClick===0){
      setPrimerClick(1);
    } else {
      setImageIndex((imageIndex + 1) % 2);
    }
    
  }

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
                Inventari
              </a>
            </li>
            <li>
              <NavLink to="/blog">Serveis</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Usuaris</NavLink>
            </li>
            <li>
              <a onClick={logout}>
                <div>Tancar sessió</div>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <button id="buttonChangeLanguage" onClick={switchVisibleSeleccion}>
            {/* {t("header.changeLanguage")} */}
            {imageIndex===1 ? 
              <CasImage/>
            : 
              <ValImage />
            }
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
