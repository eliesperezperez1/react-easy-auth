import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login/login";
import { Home } from "./components/home";
import { RequireAuth } from "react-auth-kit";
import { Dashboard } from "./components/dashboard";
import CatalogueList from "./components/catalogues";

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
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/hola"
          element={
            <RequireAuth loginPath="/login">
              <Dashboard />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/catalogues"
          element={
            <RequireAuth loginPath="/login">
              <CatalogueList />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </AppContainer>
  );
}

export default App;
