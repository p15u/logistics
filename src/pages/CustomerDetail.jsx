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
import { Row, Col } from "react-bootstrap";
import {
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
  Alert,
  Form,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter,
  numberFilter,
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
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
        note: "",
      },
      show: false,
      show2: false,
      show3: false,
      show4: false,
      note: "",
      mess: "",
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
  handleShow4 = () => {
    this.setState({ ...this.state, show4: true });
  };
  //Cập nhật trạng thái
  updateStatus = async () => {
    var data = this.state.data;
    var temp = this.state.data;
    console.log(this.state.data);
    if (data.status === 0 || data.status === 3) {
      data.status = 1;
      temp.status = 1;
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
      temp.status = 0;
    }
    console.log(this.state.data.status);

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

    this.setState({ ...this.state, data: temp });
    this.handleClose();
    this.handleClose4();
  };
  //Cập nhật trạng thái
  activeAccount = async () => {
    var data = this.state.data;
    data.status = 1;
    await CustomerService.activeAccount(data).then((res) => {
      console.log(res.data + "????????????????????????/");
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
  getStatusBtn(stt) {
    console.log(stt + "AAAAAAAAAAAA");
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
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip" {...this.props}>
                Click để duyệt tài khoản
              </Tooltip>
            }
          >
            <button onClick={this.handleShow} className="userUpdateButtonWait">
              Đang chờ duyệt
            </button>
          </OverlayTrigger>
        </div>
      );
    }
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
      console.log(res.data);
    });
  }
  getStatus(status) {
    switch (status) {
      case 0:
        return <span className="stt3">Chưa có shipper nhận</span>;
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
  render() {
    const columns = [
      {
        dataField: "idInfo",
        text: "Mã số",
        sort: true,
        headerStyle: (colum, colIndex) => {
          return {
            width: "80px",
          };
        },

        style: {
          width: "80px",
        },
      },

      {
        dataField: "nameProduct",
        text: "Tên sản phẩm",
        sort: true,
        style: {
          width: "200px",
        },
        filter: textFilter({
          style: {
            height: "35px",
            borderRadius: "10px",
            borderWidth: "1px",
            width: "150px",
          },
          placeholder: "Nhập tên...",
          onClick: (e) => console.log(e),
        }),
        headerStyle: (colum, colIndex) => {
          return { width: "200px", textAlign: "center" };
        },
      },
      {
        dataField: "kilomet",
        text: "Khoảng cách",

        sort: true,
        style: {
          width: "120px",
        },

        headerStyle: (colum, colIndex) => {
          return { width: "120px", textAlign: "center" };
        },
      },

      {
        dataField: "phiShip",
        text: "Phí ship ",
        sort: true,
        style: {
          width: "100px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "100px", textAlign: "center" };
        },
      },
      {
        dataField: "priceProduct",
        text: "Thu hộ ",
        sort: true,
        style: {
          width: "100px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "100px", textAlign: "center" };
        },
      },
      {
        dataField: "nameShipper",
        text: "Shipper nhận đơn",
        sort: true,
        style: {
          width: "210px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "210px", textAlign: "center" };
        },
        formatter: (cell, row, rowIndex, extraData) => (
          <div>
            {row.nameShipper == null ? (
              <div>
                <p>Chưa có shipper nhận</p>
              </div>
            ) : (
              <div>
                <p>{row.nameShipper}</p>
              </div>
            )}
          </div>
        ),
      },

      {
        dataField: "status",
        text: "Trạng thái",
        style: {
          width: "248px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "248px", textAlign: "center" };
        },

        formatter: (cell, row, rowIndex, extraData) =>
          this.getStatus(row.statusOrder),
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
              <Col style={{ marginLeft: "10px" }}>
                <h5>
                  <a
                    style={{
                      textDecoration: "none",
                      color: `var(--text-color)`,
                    }}
                    href="/admin/customers"
                  >
                    Danh sách khách hàng
                  </a>
                  {">"} Thông tin chi tiết
                </h5>
              </Col>
            </Row>

            <div className="userContainer">
              <div className="userShowLeft" style={{ textAlign: "center" }}>
                <div className="userShowTop" style={{ alignItems: "center" }}>
                  <img
                    style={{ alignSelf: "center" }}
                    className="imageAvatar"
                    src={`data:image/png;base64,${this.state.data.avatar}`}
                    alt="avatar"
                  />
                </div>
                <div className="userShowTopTitle">
                  <span
                    className="userShowUsername"
                    style={{
                      textAlign: "center",
                      marginTop: "5px",
                      fontSize: 18,
                    }}
                  >
                    {this.state.data.name}
                  </span>
                  <span className="userShowUserTitle">
                    Mã Khách Hàng : {this.state.data.idUser}
                  </span>
                </div>
                {/* <Button variant="contained" onClick={this.handleShow}> */}
                <div>{this.getStatusBtn(this.state.data.status)}</div>
                {/* </Button> */}
              </div>
              <div className="userShow">
                <span className="title">Chi Tiết Tài Khoản</span>
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
                <div className="userShowInfo">
                  <span>
                    <i
                      class="bx bx-spreadsheet"
                      style={{ marginRight: 10 }}
                    ></i>
                    <b>Tổng đơn hàng:</b>
                  </span>
                  <span className="userShowInfoTitle">
                    <b> {this.state.dataInfo.length}</b>
                  </span>
                </div>
                <div className="userShowInfo">
                  <span>
                    <i
                      class="bx bx-check-circle"
                      style={{ marginRight: 10 }}
                    ></i>
                    <b>Tổng đơn hàng giao thành công:</b>
                  </span>
                  <span className="userShowInfoTitle">
                    <b>
                      {
                        this.state.dataInfo.filter((x) => x.statusOrder == 5)
                          .length
                      }
                    </b>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="card">
              <div>
                <div>
                  <h6 className="title">Danh sách đơn hàng:</h6>
                </div>
                <BootstrapTable
                  keyField="idUser"
                  data={this.state.dataInfo}
                  columns={columns}
                  filter={filterFactory()}
                  defaultPageSize={10}
                  pagination={paginationFactory(options)}
                  bordered={false}
                />
              </div>
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
              {this.state.data.status == 3 ? (
                <p>
                  Bạn có chắc muốn <b>Duyệt</b> tài khoản này không? Nếu bạn xác
                  nhận họ có thể đăng nhập vào ứng dụng.
                </p>
              ) : (
                <p>
                  Bạn có chắc muốn <b>Mở tài khoản</b> này không? Nếu bạn xác
                  nhận họ sẽ có thể đăng nhập vào ứng dụng.
                </p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="info"
                onClick={
                  this.state.data.status == 3
                    ? this.activeAccount
                    : this.updateStatus
                }
              >
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

export default CustomerDetail;
