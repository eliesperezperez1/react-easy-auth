import "./App.css";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login/login";
import { Home } from "./components/home/home";
import { RequireAuth, useAuthUser } from "react-auth-kit";
import CatalogueList from "./components/catalogues/catalogues";
import EntitiesList from "./components/entities/entities";
import UserList from "./components/users/users";
import Menu, { ChangeLanguageEvent } from "./components/menu/menu";
import { ThemeProvider, createTheme } from "@mui/material";
import { caES, esES } from "@mui/material/locale";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  const change: ChangeLanguageEvent = {
    change: () => changeComponentLanguageApp(),
  };

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
  const userAuth = useAuthUser();

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
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
