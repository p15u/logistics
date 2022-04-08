import React, { useState, useEffect, PureComponent } from "react";
import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import "./css_pages/user.css";
import "./css_pages/switch.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FaEye } from "react-icons/fa";
import OrderService from "../service/Service/OrderService";
import ShipperService from "../service/Service/ShipperService.js";
import { Modal, Button } from "react-bootstrap";
import profileService from "../service/Service/profileService";

export class ShipperDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        address: "",
        avatar: "",
        cmtCode: "",
        district: "",
        emailUser: "",
        idCompany: 1,
        idDistrict: 1,
        idProvince: 1,
        idShipper: 1,
        idUser: 1,
        idWards: 1,
        licensePlates: "",
        name: "",
        nameCompany: "",
        numberPlate: "",
        phone: "",
        province: "",
        status: "",
        wards: "",
        weightCar: 12,
      },
      dataShipper: [],
      idUser: this.props.location.state.data,

      //Thong tin hang hoa
      dataInfo: [],
      order: null,
    };
  }
  componentDidMount() {
    this.getData();
  }
  getStatus(status) {
    switch (status) {
      case 1:
        return <span className="stt1">Shipper vừa nhận đơn hàng</span>;
      case 2:
        return <span className="stt1">Đang lấy hàng</span>;
      case 3:
        <span className="stt1">Đã nhận được hàng</span>;
      case 4:
        return <span className="stt1">Đang giao hàng</span>;
      case 5:
        return <span className="stt2">Đã giao hàng thành công</span>;
      case 6:
        return <span className="stt3">Đơn hàng đã hủy</span>;
      case 7:
        return <span className="stt4">Giao hàng không thành công</span>;
      case 8:
        return <span className="stt1">Lưu kho</span>;
    }
  }
  //Lấy Dữ Liệu
  getData() {
    // let data = {
    //   // idUser: `${window.location.href.slice(-1)}`,
    // idUser: this.props.location.state.data,
    // };
    // profileService
    //   .information(this.state.idUser)
    //   .then((res) => console.log(res.data));
    // let id = this.props.location.state.data;
    ShipperService.getShipperById(this.state.idUser).then((res) => {
      this.setState({
        data: res.data,
      });
    });

    OrderService.getByIdShipper(this.state.idUser).then((res) => {
      this.setState({
        dataInfo: res.data,
      });
      console.log(res.data);
    });
  }

  routeChange(item) {
    let path = `/company/orderDetail`;

    OrderService.getOrderById(item.idInfo).then((res) => {
      console.log(res.data);
      this.props.history.push({
        pathname: path,
        state: { data: res.data },
      });
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card2">
            <div style={{ width: "300px" }}>
              <h3 className="title">Thông tin chi tiết </h3>
            </div>

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
                    Mã người dùng : {this.state.data.idUser}
                  </span>
                </div>
                <Link
                  to={"/shipperupdate"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <div
                    className="userUpdateRight"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {this.state.status == 1 ? (
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
                    {", "}
                    {this.state.data.wards}
                    {", "}
                    {this.state.data.district}
                    {", "}
                    {this.state.data.province}
                  </span>
                </div>
              </div>
              <div className="userShow">
                <span className="userShowTitle">Chi Tiết Tài Xế</span>
                <div className="userShowInfo">
                  <span className="userShowUsername">ID : </span>
                  <span className="userShowInfoTitle">
                    {this.state.data.idShipper}
                  </span>
                </div>
                <div className="userShowInfo">
                  <span className="userShowUsername">Công Ty : </span>
                  <span className="userShowInfoTitle">
                    {this.state.data.nameCompany}
                  </span>
                </div>
                <div className="userShowInfo">
                  <span className="userShowUsername">cmtCode : </span>
                  <span className="userShowInfoTitle">
                    {this.state.data.numberPlate}
                  </span>
                </div>
                <div className="userShowInfo">
                  <span className="userShowUsername">Tải Trọng : </span>
                  <span className="userShowInfoTitle">
                    {this.state.data.weightCar}
                  </span>
                </div>
                <div className="userShowInfo2">
                  <span className="userShowUsername">Giấy Phép : </span>
                  <span className="userShowInfoTitle">Đã Kiểm Duyệt</span>
                  <Link
                    to={{
                      pathname: "/company/shipper",
                      // state: { data: item },
                    }}
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                    title="Click để xem giấy phép"
                  >
                    {/* <i> Click để xem ảnh</i> */}
                    <FaEye size={20} style={{ margin: "10px" }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card">
              <div className="card__header">
                <div style={{ width: "300px" }}>
                  <h5 className="title">Danh sách đơn hàng:</h5>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Mã Đơn</th>
                    {/* <th>Người Gửi</th> */}
                    {/* <th>Số Điện Thoại Gửi</th> */}
                    {/* <th>Người Nhận</th> */}
                    {/* <th>Số Điện Thoại Nhận</th> */}
                    <th>Sản phẩm vận chuyển</th>
                    <th>Ngày Gửi</th>
                    <th>Ngày Nhận</th>
                    <th>Khoảng cách</th>
                    {/* <th>Địa Chỉ Nhận</th> */}
                    {/* <th>Địa Chỉ Giao</th> */}
                    <th>Giá Tiền</th>
                    <th>Trạng Thái</th>
                    <th>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.dataInfo.map((item) => {
                    return (
                      <tr
                        key={item.idInfo}
                        onClick={() => {
                          this.routeChange(item);
                        }}
                      >
                        <td>
                          <b>#{item.idInfo}</b>
                        </td>
                        <td>{item.informationline.nameProduct}</td>
                        <td>{item.informationline.sendDate}</td>
                        <td>{item.informationline.receivedDate}</td>
                        <td>{item.informationline.kilomet}</td>
                        <td>{item.informationline.phiShip}</td>
                        <td>{this.getStatus(item.status)}</td>
                        <td>{item.time}</td>
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

export default ShipperDetail;
