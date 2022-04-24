import React, { useState, useEffect, PureComponent } from "react";
import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import "./../css_pages/user.css";
import "./../css_pages/switch.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FaEye } from "react-icons/fa";
import OrderService from "../../service/Service/OrderService";
import ShipperService from "../../service/Service/ShipperService.js";
import CustomerService from "../../service/Service/CustomerService";
import { Row, Col } from "react-bootstrap";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter,
  numberFilter,
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import profileService from "../../service/Service/profileService";
import {
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
  Alert,
  Form,
} from "react-bootstrap";
import PostService from "../../service/Service/PostService";
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
        note: "",
      },
      shipperPost: [], // shipper dang bai
      dataShipper: [],
      idUser: this.props.location.state.data,
      show: false,
      show2: false,
      show3: false,
      show4: false,
      note: "",
      mess: "",

      //Thong tin hang hoa
      dataInfo: [],
      order: null,
    };
  }
  componentDidMount() {
    this.getData();
  }

  handleClose = () => this.setState({ ...this.state, show: false });
  handleShow = () => this.setState({ ...this.state, show: true });
  handleClose2 = () => this.setState({ ...this.state, show2: false });
  handleShow2 = () => this.setState({ ...this.state, show2: true });
  handleClose3 = () => this.setState({ ...this.state, show3: false });
  handleShow3 = () => this.setState({ ...this.state, show3: true });
  handleClose4 = () =>
    this.setState({ ...this.state, show4: false, mess: "", note: "" });
  handleShow4 = () => this.setState({ ...this.state, show4: true });
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
    PostService.getPost(this.state.idUser).then((res) => {
      this.setState({
        shipperPost: res.data,
      });
    });
  }
  getStatusBtn(stt) {
    if (stt == 0) {
      return (
        <div>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip" {...this.props}>
                Click để mở tài khoản
              </Tooltip>
            }
          >
            <button onClick={this.handleShow} className="userUpdateButtonER">
              Ngưng hoạt động
            </button>
          </OverlayTrigger>
        </div>
      );
    } else if (stt == 1) {
      return (
        <div>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip" {...this.props}>
                Click để khóa tài khoản
              </Tooltip>
            }
          >
            <button onClick={this.handleShow4} className="userUpdateButtonSS">
              Đang hoạt động
            </button>
          </OverlayTrigger>
        </div>
      );
    } else if (stt == 2) {
      return (
        <div>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip" {...this.props}>
                Click để khóa tài khoản
              </Tooltip>
            }
          >
            <button onClick={this.handleShow4} className="userUpdateButtonER">
              Đang tắt
            </button>
          </OverlayTrigger>
        </div>
      );
    } else {
      return (
        <div>
          <button className="userUpdateButtonWait">Đang chờ duyệt</button>
        </div>
      );
    }
  }
  //Cập nhật trạng thái
  updateStatus = async () => {
    var data = this.state.data;
    console.log(this.state.note);

    if (data.status === 0) {
      data.status = 1;
    } else {
      if (this.state.note == "") {
        this.setState({
          ...this.state,
          mess: "Vui lòng nhập lí do khóa tài khoản",
        });
        return;
      } else {
        data.note = this.state.note;
      }
      data.status = 0;
    }

    await CustomerService.updateStatus(data).then((res) => {
      if (res.data == 1) {
        this.handleShow2();
        window.setTimeout(() => {
          this.setState({ ...this.state, show2: false });
        }, 2000);
      } else {
        this.handleShow3();
        window.setTimeout(() => {
          this.setState({ ...this.state, show3: false });
        }, 2000);
      }
    });

    this.setState({ ...this.state, data: data });
    this.handleClose();
    this.handleClose4();
  };

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
    const columnsPost = [
      {
        dataField: "idShipperPost",
        text: "Mã số",
        sort: true,
        headerStyle: (colum, colIndex) => {
          return {
            width: "40px",
          };
        },
        style: {
          width: "40px",
        },
      },
      {
        dataField: "title",
        text: "Tiêu đề",
        sort: true,
        headerStyle: (colum, colIndex) => {
          return {
            width: "80px",
          };
        },
        filter: textFilter({
          style: {
            height: "35px",
            borderRadius: "10px",
            borderWidth: "1px",
            width: "150px",
          },
          placeholder: "Nhập...",
        }),

        style: {
          width: "80px",
        },
      },

      {
        dataField: "fromAddress",
        text: "Điểm đi",

        sort: true,
        style: {
          width: "120px",
          textAlign: "justify",
        },

        headerStyle: (colum, colIndex) => {
          return { width: "120px", textAlign: "center" };
        },
      },
      {
        dataField: "fromAddress",
        text: "Điểm đến",

        sort: true,
        style: {
          width: "120px",
          textAlign: "justify",
        },

        headerStyle: (colum, colIndex) => {
          return { width: "120px", textAlign: "center" };
        },
      },
      {
        dataField: "datePost",
        text: "Ngày đăng",

        sort: true,
        style: {
          width: "60px",
        },

        headerStyle: (colum, colIndex) => {
          return {
            width: "60px",
            textAlign: "center",
          };
        },
      },
      {
        dataField: "dateExpect",
        text: "Thời gian dự kiến đến",

        sort: true,
        style: {
          width: "60px",
        },

        headerStyle: (colum, colIndex) => {
          return { width: "60px", textAlign: "center" };
        },
      },
    ];
    const options = {
      // pageStartIndex: 0,
      sizePerPage: 5,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true,
    };
    return (
      <div className="row">
        <div className="card">
          <div className="card__body">
            <Row>
              <Col>
                <h5>
                  <a
                    style={{
                      textDecoration: "none",
                      color: `var(--text-color)`,
                    }}
                    href="/company/shipper"
                  >
                    Danh sách tài xế
                  </a>
                  {">"} Thông tin chi tiết
                </h5>
              </Col>
            </Row>

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
                {/* <Button variant="contained" onClick={this.handleShow}> */}
                <div
                  className="userUpdateRight"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {this.getStatusBtn(this.state.data.status)}
                  {/* {this.state.data.status == 1 ? (
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                          <Tooltip id="button-tooltip" {...this.props}>
                            Click để Khóa tài khoản
                          </Tooltip>
                        }
                      >
                        <button className="userUpdateButtonSS">
                          Hoạt động
                        </button>
                      </OverlayTrigger>
                    ) : (
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                          <Tooltip id="button-tooltip" {...this.props}>
                            Click để Mở tài khoản
                          </Tooltip>
                        }
                      >
                        <button
                          // style={{ textDecoration: "none", color: "white" }}
                          className="userUpdateButtonER"
                        >
                          Ngưng hoạt động
                        </button>
                      </OverlayTrigger>
                    )} */}
                </div>
                {/* </Button> */}
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
                <div className="userShowInfo">
                  <span className="userShowUsername">Giấy Phép : </span>
                  <div className="userShowTop" style={{ marginLeft: "10px" }}>
                    <img
                      src={`data:image/png;base64,${this.state.data.licensePlates}`}
                      alt="Giấy phép kinh doanh"
                      className="img-lg rounded-0"
                      // width="130px"
                      height="180px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card">
              <div className="ttkh">
                <h5 style={{ padding: "5px" }}>Danh sách đơn hàng</h5>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Mã Đơn</th>
                    <th>Sản phẩm vận chuyển</th>
                    <th>Ngày Gửi</th>
                    <th>Ngày Nhận</th>
                    <th>Khoảng cách</th>
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
          <div>
            <div className="card">
              <div className="ttkh">
                <h5 style={{ padding: "5px" }}>Danh sách bài đăng</h5>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Mã Đơn</th>
                    <th>Tiêu đề</th>
                    <th>Điểm đi</th>
                    <th>Điểm đến</th>
                    <th>Ngày đăng</th>
                    <th>Thời gian dự kiến đến</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.shipperPost.map((item) => {
                    return (
                      <tr
                        key={item.idShipperPost}
                        onClick={() => {
                          this.routeChange(item);
                        }}
                      >
                        <td>
                          <b>#{item.idShipperPost}</b>
                        </td>
                        <td>{item.title}</td>
                        <td>{item.fromAddress}</td>
                        <td>{item.toAddress}</td>
                        <td>{item.datePost}</td>
                        <td>{item.dateExpect}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <Modal show={this.state.show4} onHide={this.handleClose4}>
            <Modal.Header closeButton>
              <Modal.Title>Khóa tài khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Nếu bạn khóa tài khoản, họ sẽ không thể đăng nhập vào ứng dụng.
              </p>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Lí do:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  required
                  value={this.state.note}
                  onFocus={(e) => this.setState({ ...this.state, mess: "" })}
                  onChange={(e) =>
                    this.setState({ ...this.state, note: e.target.value })
                  }
                />
              </Form.Group>
              <p style={{ color: "crimson" }}>
                <b>{this.state.mess}</b>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="info" onClick={this.updateStatus}>
                Gửi
              </Button>
              <Button variant="dark" onClick={this.handleClose4}>
                Không
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thay đổi trạng thái</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.data.status == 1 ? (
                <p>
                  Bạn có chắc muốn <b>Ngưng hoạt động</b> tài khoản này không?
                  Nếu bạn xác nhận họ sẽ không thể đăng nhập vào ứng dụng.
                </p>
              ) : (
                <p>
                  Bạn có chắc muốn <b>Mở tài khoản</b> này không? Nếu bạn xác
                  nhận họ sẽ có thể đăng nhập vào ứng dụng.
                </p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="info" onClick={this.updateStatus}>
                Có
              </Button>
              <Button variant="dark" onClick={this.handleClose}>
                Không
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,

            right: 50,
            zIndex: 999,
            width: "30%",
          }}
        >
          <Alert
            show={this.state.show2}
            variant="success"
            style={{ width: "450px", height: "60px" }}
          >
            <p>Thay đổi trạng thái thành công</p>
          </Alert>
        </div>
        <div
          style={{
            position: "absolute",
            top: 10,

            right: 60,
            zIndex: 999,
            width: "30%",
          }}
        >
          <Alert
            show={this.state.show3}
            variant="danger"
            style={{ width: "450px", height: "60px" }}
          >
            <p>Thay đổi trạng thái thất bại. Vui lòng thử lại</p>
          </Alert>
        </div>
      </div>
    );
  }
}

export default ShipperDetail;
