import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./404.css";

export default function PageNotFound() {
  const role = Cookies.get("role");
  let path = role === "__cp" ? "/company/dashboard" : "/admin/dashboard";
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
        </div>
        <h2>Oops, The Page you are looking for can't be found!</h2>
        <Link to={path}>
          <span className="arrow"></span>Return To Homepage
        </Link>
      </div>
    </div>
  );
}
