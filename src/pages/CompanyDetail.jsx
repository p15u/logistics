import React, { PureComponent } from "react";
import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import "./css_pages/user.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import OrderService from "../service/Service/OrderService";
import ShipperService from "../service/Service/ShipperService.js";
import CompanyService from "../service/Service/CompanyService";
import { Row, Col } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import active from "../assets/images/active.png";
import inactive from "../assets/images/inactive.jpg";
import waiticon from "../assets/images/wait.png";
import off from "../assets/images/off.png";
import filterFactory, {
  textFilter,
  selectFilter,
  numberFilter,
} from "react-bootstrap-table2-filter";

import {
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
  Alert,
  Form,
} from "react-bootstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import CustomerService from "../service/Service/CustomerService";
export class CompanyDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataCompany: [],
      data: {
        name: "",
        phone: "",
        email: "",
        address: "",
        image: "",
        status: 0,
        idCompany: 0,
        idUser: 0,
        wards: "",
        district: "",
        province: "",
        avatar: "",
        masothue: "",
        giayphepKD: "",
        note: "",
      },
      idUser: this.props.location.state.data,

      //Thong tin hang hoa
      dataInfo: [],
      //Thong tin tai xe
      dataShipper: [],
      show: false,
      show2: false,
      show3: false,
      show4: false,
      note: "",
      mess: "",
    };
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
  componentDidMount() {
    this.getData();
  }

  //Lấy Dữ Liệu
  getData() {
    console.log(this.state.idUser);
    CompanyService.getCompanyById(this.state.idUser).then((res) => {
      console.log(res.data);
      this.setState({ data: res.data });
    });

    // OrderService.getOrder().then((res) => {
    //   this.setState({
    //     dataInfo: res.data,
    //   });
    // });

    ShipperService.getShipperCompany(this.state.idUser).then((res) => {
      this.setState({
        dataShipper: res.data,
      });
    });
  }
  routeChangeShipper(item) {
    let path = `/admin/shipperdetail`;
    console.log(item);
    this.props.history.push({
      pathname: path,
      state: { data: item.idUser },
    });
  }
  getStatus(stt) {
    if (stt == 0) {
      return (
        <div>
          <p>
            <img
              height={15}
              width={15}
              style={{ marginRight: 5, marginLeft: 20 }}
              src={inactive}
              alt="inactive"
            />
            Ngưng hoạt động
          </p>
        </div>
      );
    } else if (stt == 1) {
      return (
        <div>
          <p>
            <img
              height={15}
              width={15}
              style={{ marginRight: 5, marginLeft: 20 }}
              src={active}
              alt="active"
            />
            Đang hoạt động
          </p>
        </div>
      );
    } else if (stt == 2) {
      return (
        <div>
          <p>
            <img
              height={15}
              width={15}
              style={{ marginRight: 5, marginLeft: 20 }}
              src={off}
              alt="inactive"
            />
            Đang tắt
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p>
            <img
              height={15}
              width={15}
              style={{ marginRight: 5, marginLeft: 20 }}
              src={waiticon}
              alt="wait"
            />
            Đang chờ duyệt
          </p>
        </div>
      );
    }
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
  render() {
    const tableRowEvents = {
      onClick: (e, row, rowIndex) => {
        let path = `/admin/shipperdetail`;

        this.props.history.push({
          pathname: path,
          state: { data: row.idUser },
        });
      },
    };
    const columns = [
      {
        dataField: "idUser",
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
        dataField: "name",
        text: "Tên",
        sort: true,
        style: {
          width: "200px",
        },
        filter: textFilter({
          style: {
            height: "35px",
            borderRadius: "10px",
            borderWidth: "1px",
            width: "170px",
          },
          placeholder: "Nhập tên...",
          onClick: (e) => console.log(e),
        }),
        headerStyle: (colum, colIndex) => {
          return { width: "200px", textAlign: "center" };
        },
      },

      {
        dataField: "sumOrder",
        text: "Tổng đơn",
        sort: true,
        style: {
          width: "70px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "70px", textAlign: "center" };
        },
      },

      {
        dataField: "status",
        text: "Trạng thái",
        style: {
          width: "200px",
        },
        align: "center",

        headerStyle: (colum, colIndex) => {
          return { width: "200px", textAlign: "center" };
        },

        formatter: (cell, row, rowIndex, extraData) => (
          <div>{this.getStatus(row.status)}</div>
        ),
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
                    href="/admin/company"
                  >
                    Danh sách doanh nghiệp
                  </a>
                  {">"} Thông tin chi tiết
                </h5>
              </Col>
            </Row>
            <div className="userContainer">
              <div className="userShowLeft">
                <div className="userShowTop">
                  <img
                    src={`data:image/png;base64,${this.state.data.avatar}`}
                    alt="avatar"
                    className="imageAvatar"
                  />
                </div>
                <div className="userShowTopTitle">
                  <span className="userShowUsername">
                    {this.state.data.name}
                  </span>
                  <span className="userShowUserTitle">
                    <i>
                      <b>Mã tài khoản : #{this.state.data.idUser} </b>
                    </i>
                  </span>
                </div>

                <div className="userUpdateRight">
                  <div
                    className="userUpdateRight"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {this.getStatusBtn(this.state.data.status)}
                  </div>
                </div>
              </div>
              <div className="userShow">
                <span className="userShowTitle">Chi Tiết Doanh Nghiệp</span>
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
                    {this.state.data.address +
                      ", " +
                      this.state.data.wards +
                      ", " +
                      this.state.data.district +
                      ", " +
                      this.state.data.province}
                  </span>
                </div>
              </div>
              <div className="userShow">
                <span className="userShowTitle">Chi Tiết Tài Khoản</span>
                <div className="userShowInfo">
                  <span className="userShowUsername">ID : </span>
                  <span className="userShowInfoTitle">
                    {this.state.data.idCompany}
                  </span>
                </div>
                <div className="userShowInfo">
                  <span className="userShowUsername">Mã Số Thuế : </span>
                  <span className="userShowInfoTitle">
                    {this.state.data.masothue}
                  </span>
                </div>
                <div className="userShowInfo">
                  <span className="userShowUsername">Giấy Phép KD : </span>
                  <div className="userShowTop">
                    <img
                      src={`data:image/png;base64,${this.state.data.giayphepKD}`}
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
              <div>
                <h6 className="title">Danh sách đơn hàng:</h6>
              </div>
              <BootstrapTable
                keyField="idUser"
                data={this.state.dataShipper}
                columns={columns}
                filter={filterFactory()}
                defaultPageSize={10}
                rowEvents={tableRowEvents}
                pagination={paginationFactory(options)}
                bordered={false}
              />
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

export default CompanyDetail;
