import React from "react";

import "./topnav.css";

import { Link } from "react-router-dom";

import Dropdown from "../dropdown/Dropdown";

import ThemeMenu from "../thememenu/ThemeMenu";

import user_menu from "../../assets/JsonData/user_menus_admin.json";
import company_menu from "../../assets/JsonData/user_menus_company.json";
import SearchBar from "../search/search";
import Cookies from "js-cookie";

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
);

const renderUserToggle = (path) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img className="img-xs rounded-circle" src={path} alt="profile" />
    </div>
    <div className="topnav__right-user__name">{Cookies.get("name")}</div>
  </div>
);
const clickDropDown = (e) => {
  if (e.target.innerText === "Đăng xuất") {
    Cookies.remove("name");
    Cookies.remove("id");
    Cookies.remove("isLogged");
    Cookies.remove("avatar");
    Cookies.remove("role");
  }
};

const renderUserMenu = (item, index) => (
  <Link
    style={{ textDecoration: "none", color: "black" }}
    to={item.route}
    key={index}
    onClick={(e) => clickDropDown(e)}
  >
    <div className="notification-item">
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
    <div className="separate"></div>
  </Link>
);

const Topnav = () => {
  const current_menu =
    Cookies.get("role") === "__cp" ? company_menu : user_menu;
  const path = `https://scontent.fsgn5-13.fna.fbcdn.net/v/t1.6435-9/119990267_1507051709467988_8980319581349841457_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=174925&_nc_ohc=LrA-yn1gU9AAX8RKbbi&_nc_ht=scontent.fsgn5-13.fna&oh=00_AT8n3zp9EAC5J99yJiZXmPJBV6PVt9wIcqhPquZ32PgBoA&oe=627A380B`;
  return (
    <div className="topnav">
      <div>
        <SearchBar />
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          {/* dropdown here */}
          <Dropdown
            customToggle={() => renderUserToggle(path)}
            contentData={current_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        {/* <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/">View All</Link>}
          /> */}
        {/* dropdown here */}
        {/* </div> */}
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
