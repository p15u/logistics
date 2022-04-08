import React from "react";

import "./layout.css";
import Routes from "../Routes";

import { BrowserRouter, Route } from "react-router-dom";
const Layout = () => {
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div>
            <Routes />
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
