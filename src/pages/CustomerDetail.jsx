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
  //C???p nh???t tr???ng th??i
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
          mess: "Vui l??ng nh???p l?? do kh??a t??i kho???n",
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
  //C???p nh???t tr???ng th??i
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
                Click ????? m??? t??i kho???n
              </Tooltip>
            }
          >
            <button onClick={this.handleShow} className="userUpdateButtonER">
              Ng??ng ho???t ?????ng
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
                Click ????? kh??a t??i kho???n
              </Tooltip>
            }
          >
            <button onClick={this.handleShow4} className="userUpdateButtonSS">
              ??ang ho???t ?????ng
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
                Click ????? kh??a t??i kho???n
              </Tooltip>
            }
          >
            <button onClick={this.handleShow4} className="userUpdateButtonER">
              ??ang t???t
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
                Click ????? duy???t t??i kho???n
              </Tooltip>
            }
          >
            <button onClick={this.handleShow} className="userUpdateButtonWait">
              ??ang ch??? duy???t
            </button>
          </OverlayTrigger>
        </div>
      );
    }
  }
  //L???y D??? Li???u
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
        return <span className="stt3">Ch??a c?? shipper nh???n</span>;
      case 1:
        return <span className="stt1">Shipper v???a nh???n ????n h??ng</span>;
      case 2:
        return <span className="stt1">??ang l???y h??ng</span>;
      case 3:
        <span className="stt1">???? nh???n ???????c h??ng</span>;
      case 4:
        return <span className="stt1">??ang giao h??ng</span>;
      case 5:
        return <span className="stt2">???? giao h??ng th??nh c??ng</span>;
      case 6:
        return <span className="stt3">????n h??ng ???? h???y</span>;
      case 7:
        return <span className="stt4">Giao h??ng kh??ng th??nh c??ng</span>;
      case 8:
        return <span className="stt1">L??u kho</span>;
    }
  }
  render() {
    const columns = [
      {
        dataField: "idInfo",
        text: "M?? s???",
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
        text: "T??n s???n ph???m",
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
          placeholder: "Nh???p t??n...",
          onClick: (e) => console.log(e),
        }),
        headerStyle: (colum, colIndex) => {
          return { width: "200px", textAlign: "center" };
        },
      },
      {
        dataField: "kilomet",
        text: "Kho???ng c??ch",

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
        text: "Ph?? ship ",
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
        text: "Thu h??? ",
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
        text: "Shipper nh???n ????n",
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
                <p>Ch??a c?? shipper nh???n</p>
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
        text: "Tr???ng th??i",
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
                    Danh s??ch kh??ch h??ng
                  </a>
                  {">"} Th??ng tin chi ti???t
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
                    M?? Kh??ch H??ng : {this.state.data.idUser}
                  </span>
                </div>
                {/* <Button variant="contained" onClick={this.handleShow}> */}
                <div>{this.getStatusBtn(this.state.data.status)}</div>
                {/* </Button> */}
              </div>
              <div className="userShow">
                <span className="title">Chi Ti???t T??i Kho???n</span>
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
                    <b>T???ng ????n h??ng:</b>
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
                    <b>T???ng ????n h??ng giao th??nh c??ng:</b>
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
                  <h6 className="title">Danh s??ch ????n h??ng:</h6>
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
              <Modal.Title>Kh??a t??i kho???n</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                N???u b???n kh??a t??i kho???n, h??? s??? kh??ng th??? ????ng nh???p v??o ???ng d???ng.
              </p>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>L?? do:</Form.Label>
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
                G???i
              </Button>
              <Button variant="dark" onClick={this.handleClose4}>
                Kh??ng
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thay ?????i tr???ng th??i</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.data.status == 3 ? (
                <p>
                  B???n c?? ch???c mu???n <b>Duy???t</b> t??i kho???n n??y kh??ng? N???u b???n x??c
                  nh???n h??? c?? th??? ????ng nh???p v??o ???ng d???ng.
                </p>
              ) : (
                <p>
                  B???n c?? ch???c mu???n <b>M??? t??i kho???n</b> n??y kh??ng? N???u b???n x??c
                  nh???n h??? s??? c?? th??? ????ng nh???p v??o ???ng d???ng.
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
                C??
              </Button>
              <Button variant="dark" onClick={this.handleClose}>
                Kh??ng
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
            <p>Thay ?????i tr???ng th??i th??nh c??ng</p>
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
            <p>Thay ?????i tr???ng th??i th???t b???i. Vui l??ng th??? l???i</p>
          </Alert>
        </div>
      </div>
    );
  }
}

export default CustomerDetail;
