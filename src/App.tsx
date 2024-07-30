import "./App.css";
import styled from "styled-components";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./components/login/login";
import { Home } from "./components/home/home";
import { RequireAuth, useAuthUser } from "react-auth-kit";
import CatalogueList from "./components/catalogues/catalogues";
import EntitiesList from "./components/entities/entities";
import UserList from "./components/users/users";
import Menu, { ChangeLanguageEvent } from "./components/menu/menu";
import { ThemeProvider, createTheme } from "@mui/material";
import { caES, esES } from "@mui/material/locale";
import { GraphList } from "./components/graphs/graphs";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The main application component.
 */
function App() {
  const change: ChangeLanguageEvent = {
    change: () => changeComponentLanguageApp(),
  };

/**
 * Retrieves the value of a cookie by its name.
 *
 * @param {string} name - The name of the cookie.
 * @return {string | undefined} The value of the cookie, or undefined if the cookie does not exist.
 */
  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const token = getCookie("token");

/**
 * Checks if a JWT token is expired by decoding it and comparing the expiration time with the current time.
 * If the token is expired, it clears the "_auth" cookie.
 *
 * @param {string} token - The JWT token to check.
 * @return {boolean} Returns true if the token is expired, false otherwise.
 */
  function isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode(token);
      const flag = decoded.exp < Date.now() / 1000;
      if(flag){
        document.cookie =
          "_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
      return flag;
    } catch (err) {
      console.error("Error decodificando el token", err);
      return false;
    }
  }

  const changeComponentLanguageApp = () => {};
  const themeCat = createTheme(
    {
      typography: {
        fontFamily: "Montserrat",
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: `
        @font-face {
          font-family: 'Montserrat';
          src: url(https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap);
        }
      `,
        },
      },
    },
    caES
  );
  const themeEs = createTheme(
    {
      typography: {
        fontFamily: "Montserrat",
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: `
        @font-face {
          font-family: 'Montserrat';
          src: url(https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap);
        }
      `,
        },
      },
    },
    esES
  );
  const navigate = useNavigate();
  const userAuth = useAuthUser();

  useEffect(() => {
    const token = getCookie("_auth");
    if (isTokenExpired(token)) {
      navigate("/login");
    }
  }, [navigate]);


  return (
    <ThemeProvider
      theme={
        !userAuth() || userAuth().user.language === "caES" ? themeCat : themeEs
      }
    >
      <AppContainer>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth loginPath="/login">
                <>
                  <Menu change={change} />
                  <Home />
                </>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/catalogues"
            element={
              <RequireAuth loginPath="/login">
                <>
                  <Menu change={change} />
                  <CatalogueList />
                </>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/entities"
            element={
              <RequireAuth loginPath="/login">
                <>
                  <Menu change={change} />
                  <EntitiesList />
                </>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/users"
            element={
              <RequireAuth loginPath="/login">
                <>
                  <Menu change={change} />
                  <UserList />
                </>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/graphs"
            element={
              <RequireAuth loginPath="/login">
                <>
                  <Menu change={change} />
                  <GraphList />
                </>
              </RequireAuth>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
