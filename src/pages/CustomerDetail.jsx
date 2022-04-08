import React, { useState, useEffect, PureComponent } from "react";
import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import "./css_pages/user.css";
import { Link } from "react-router-dom";
import ProfileApi from "../service/Service/profileService";
import Cookies from "js-cookie";
import OrderService from "../service/Service/OrderService";
import CustomerService from "../service/Service/CustomerService";

export class CustomerDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      idUser: this.props.location.state.data,
      //Thong tin hang hoa
      dataInfo: [],
      data: {
        address: "",
        avatar: "",
        district: "",
        emailUser: "",
        idDistrict: 0,
        idProvince: 0,
        idUser: this.props.location.state.data,
        idWards: 0,
        name: "",
        phone: "",
        province: "",
        status: 0,
        wards: "",
      },
    };
  }
  componentDidMount() {
    this.getData();
  }
  //Lấy Dữ Liệu
  async getData() {
    await CustomerService.getUserById(this.state.idUser).then((res) => {
      this.setState({ data: res.data });
    });
    await OrderService.getOrderByIdUser(this.state.idUser).then((res) => {
      this.setState({
        dataInfo: res.data,
      });
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <h2 className="page-header">
              Thông Tin Khách Hàng {this.state.path}
            </h2>
            <div className="userContainer">
              <div className="userShowLeft">
                <div className="userShowTop">
                  <img
                    className="imageAvatar"
                    src={`data:image/png;base64,${this.state.data.avatar}`}
                    alt="avatar"
                  />
                </div>
                <div className="userShowTopTitle">
                  <span className="userShowUsername">
                    {this.state.data.name}
                  </span>
                  <span className="userShowUserTitle">
                    Mã Khách Hàng : {this.state.data.idUser}
                  </span>
                </div>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={"/customerupdate"}
                >
                  <div
                    style={{ textDecoration: "none", color: "white" }}
                    className="userUpdateRight"
                  >
                    {this.state.data.status == 1 ? (
                      <button
                        style={{ textDecoration: "none", color: "white" }}
                        className="userUpdateButtonSS"
                      >
                        Hoạt động
                      </button>
                    ) : (
                      <button
                        style={{ textDecoration: "none", color: "white" }}
                        className="userUpdateButtonER"
                      >
                        Ngưng hoạt động
                      </button>
                    )}
                  </div>
                </Link>
              </div>
              <div className="userShow">
                <span className="userShowTitle">Chi Tiết Tài Khoản</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {this.state.data.name}
                  </span>
                </div>

                <div className="userShowInfo">
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {this.state.data.phone}
                  </span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {this.state.data.emailUser}
                  </span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {this.state.data.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="card">
              <div className="card__header">
                <h3>Đơn Hàng</h3>
              </div>
              <table>
                <thead></thead>
                <tbody>
                  <tr>
                    <th>STT</th>
                    <th>Mã Đơn</th>
                    <th>Người Nhận</th>
                    <th>Số Điện Thoại Nhận</th>
                    {/* <th>Ngày Gửi</th> */}
                    {/* <th>Ngày Nhận</th> */}
                    {/* <th>Địa Chỉ Nhận</th> */}
                    {/* <th>Địa Chỉ Giao</th> */}
                    <th>Tên Sản Phẩm</th>
                    <th>Giá Tiền</th>
                    <th>Trạng Thái</th>
                  </tr>
                  {this.state.dataInfo.map((item, key) => {
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>
                          #<b>{item.idInfo}</b>
                        </td>
                        <td>{item.nameReceiver}</td>
                        <td>{item.phoneReceiver}</td>
                        {/* <td>{item.sendDate}</td> */}
                        {/* <td>{item.receivedDate}</td> */}
                        {/* <td>{item.addressSender}</td> */}
                        {/* <td>{item.addressReceiver}</td> */}
                        <td>{item.nameProduct}</td>
                        <td>{item.priceProduct}</td>
                        <td>{item.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerDetail;
