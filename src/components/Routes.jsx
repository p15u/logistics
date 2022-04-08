import React from "react";
import Cookies from "js-cookie";
import { Route, Switch, Redirect, NotFoundRoute } from "react-router-dom";
import AdminRoute from "./route/AdminRoute";
import CompanyRoute from "./route/CompanyRoute";

// import admin
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Shipper from "../pages/Shipper";
import Company from "../pages/Company";
import CustomerDetail from "../pages/CustomerDetail";
import CustomerUpdate from "../pages/CustomerUpdate";
import CompanyDetail from "../pages/CompanyDetail";
import ShipperDetail from "../pages/ShipperDetail";
import CompanyUpdate from "../pages/CompanyUpdate";
import ShipperUpdate from "../pages/ShipperUpdate";
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";
import NewsEdit from "../pages/news/NewsEdit";
import NewsDetail from "../pages/news/NewsDetail";
import News from "../pages/news/News";
import ChangePassword from "../pages/changePassword/changePassword";
import AddNews from "../pages/news/AddNews";
// import company
import DashboardCompany from "../pages/company/Dashboard";
import CustomersCompany from "../pages/company/Customers";
import ShipperCompany from "../pages/company/Shipper";
import ProfileCompany from "../pages/company/profile/ProfileCompany";
import EditProfileCompany from "../pages/company/profile/EditProfileCompany";
import OrderCompany from "../pages/company/order/OrderList";
import OrderDetail from "../pages/company/order/orderDetail";
// import authentication
import Login from "../pages/authentication/Login";
import ForgetPass from "../pages/authentication/ForgetPW";
import ResetPassword from "../pages/authentication/ResetPassword";
import OtpComfirm from "../pages/authentication/OTPComfirm";
import PageNotFound from "../pages/404/404";
import SignUp from "../pages/authentication/SignUp";

const Routes = () => {
  const token = Cookies.get("isLogged");
  const role = Cookies.get("role");
  let path = role == "__cp" ? "/company/dashboard" : "/admin/dashboard";
  return (
    <Switch>
      <AdminRoute path="/admin/dashboard" exact component={Dashboard} />
      <AdminRoute path="/admin/customers" component={Customers} />
      <AdminRoute path="/admin/shipper" component={Shipper} />
      <AdminRoute path="/admin/company" component={Company} />
      <AdminRoute path="/admin/customerdetail" component={CustomerDetail} />
      <AdminRoute path="/admin/customerupdate" component={CustomerUpdate} />
      <AdminRoute path="/admin/companydetail" component={CompanyDetail} />
      <AdminRoute path="/admin/companyupdate" component={CompanyUpdate} />
      <AdminRoute path="/admin/shipperdetail" component={ShipperDetail} />
      <AdminRoute path="/admin/shipperupdate" component={ShipperUpdate} />
      <AdminRoute path="/admin/profile" component={Profile} />
      <AdminRoute path="/admin/editprofile" component={EditProfile} />
      <AdminRoute path="/admin/news" component={News} />
      <AdminRoute path="/admin/newsupdate/:id" component={NewsEdit} />
      <AdminRoute path="/admin/newsdetail/:id" component={NewsDetail} />
      <AdminRoute path="/changepassword" component={ChangePassword} />

      <AdminRoute path="/admin/addNews" component={AddNews} />

      {/* company */}
      <CompanyRoute path="/company/dashboard" component={DashboardCompany} />
      <CompanyRoute path="/company/customers" component={CustomersCompany} />
      <CompanyRoute path="/company/shipper" component={ShipperCompany} />
      <CompanyRoute path="/company/profile" component={ProfileCompany} />
      <CompanyRoute path="/company/customerdetail" component={CustomerDetail} />
      <CompanyRoute path="/company/shipperdetail" component={ShipperDetail} />
      <CompanyRoute
        path="/company/editprofile"
        component={EditProfileCompany}
      />
      <CompanyRoute path="/changepassword" component={ChangePassword} />
      <CompanyRoute path="/company/order" component={OrderCompany} />
      <CompanyRoute path="/company/orderdetail" component={OrderDetail} />

      {/* route */}
      <Route path="/login" component={Login} />
      <Route path="/forgetpass" component={ForgetPass} />
      <Route path="/sendotp" component={OtpComfirm} />
      <Route path="/resetpass" component={ResetPassword} />
      <Route path="/signupcompany" component={SignUp} />
      {/* <Route component={PageNotFound} /> */}

      {(path = token ? path : "/login")}

      <Redirect to={path} />
    </Switch>
  );
};

export default Routes;
