import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as Brand } from "../../assets/logowithname.svg";
import MenuIcon from "@mui/icons-material/Menu";
import "./menu.css";
import { useSignOut } from "react-auth-kit";

const Menu = () => {
  const singOut = useSignOut();
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);

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
      </div>
    </nav>
  );
};

export default Menu;
