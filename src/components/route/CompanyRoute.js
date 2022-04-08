import React, { useEffect, useState } from "react";

import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "../sidebar/Sidebar";
import Topnav from "../topnav/TopNav";
import { useSelector, useDispatch } from "react-redux";

import "../layout/layout.css";
import ThemeAction from "../../redux/actions/ThemeAction";

function CompanyRouter({ component: Component, ...rest }) {
  const pathname = rest.location.pathname;
  const authed = Cookies.get("isLogged");
  const role = Cookies.get("role");
  const themeReducer = useSelector((state) => state.ThemeReducer);
  const [isFullPageLayout, setFullPageLayout] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-light");

    const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

    dispatch(ThemeAction.setMode(themeClass));

    dispatch(ThemeAction.setColor(colorClass));
  }, [dispatch]);

  console.log(pathname);
  if (role !== "__cp") {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )}
      />
    );
  } else {
    return (
      <Route
        {...rest}
        render={(props) =>
          authed ? (
            <div
              className={`layout ${themeReducer.mode} ${themeReducer.color}`}
            >
              <Sidebar {...props} />
              <div className="layout__content">
                <Topnav />
                <div className="layout__content-main">
                  <Component {...props} />
                </div>
              </div>
            </div>
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
}
export default CompanyRouter;
