import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Layout from "./Layout/Layout";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import PrivateRoute from "./PrivateRoute";
import PrivatePage from "./Components/PrivatePage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="/privatePage"
              element={
                <PrivateRoute>
                  <PrivatePage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
