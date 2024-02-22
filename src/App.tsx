import "./App.css";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login/login";
import { Home } from "./components/home/home";
import { RequireAuth } from "react-auth-kit";
import { Dashboard } from "./components/dashboard/dashboard";
import CatalogueList from "./components/catalogues/catalogues";
import EntitiesList from "./components/entities/entities";
import Menu from "./components/menu/menu";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth loginPath="/login">
              <>
                <Menu />
                <Home />
              </>
            </RequireAuth>
          }
        ></Route>
        {/* <Route
          path="/hola"
          element={
            <RequireAuth loginPath="/login">
              <>
                <Menu />
                <Dashboard />
              </>
            </RequireAuth>
          }
        ></Route> */}
        <Route
          path="/catalogues"
          element={
            <RequireAuth loginPath="/login">
              <>
                <Menu />
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
                <Menu />
                <EntitiesList />
              </>
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </AppContainer>
  );
}

export default App;
