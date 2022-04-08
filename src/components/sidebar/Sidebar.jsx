import React from "react";

import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./sidebar.css";

import logo from "../../assets/images/Logo_Logistics_2.png";

import sidebar_items_admin from "../../assets/JsonData/sidebar_routes_admin.json";
import sidebar_items_company from "../../assets/JsonData/slidebar_routes_company.json";
let sidebar_items_current = "";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  sidebar_items_current =
    Cookies.get("role") === "__cp"
      ? sidebar_items_company
      : sidebar_items_admin;
  const activeItem = sidebar_items_current.findIndex(
    (item) => item.route === props.location.pathname
  );

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="company logo" />
      </div>
      {sidebar_items_current.map((item, index) => (
        <Link style={{ textDecoration: "none" }} to={item.route} key={index}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={index === activeItem}
          />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
