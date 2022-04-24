import React, { PureComponent, useState } from "react";
import { Button, Row, Col, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import OrderService from "../../../service/Service/OrderService";
import {
  FaCircle,
  FaRegAddressCard,
  FaPhoneAlt,
  FaUser,
  FaRegListAlt,
  FaShippingFast,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./detailOrder.css";
export default class OrderDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.location.state.data,
      history: [],
    };
  }
  componentDidMount() {
    OrderService.getHistory(this.state.data.idInfo).then((res) => {
      this.setState({ history: res.data });
      console.log(res.data);
    });
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

  render() {
    let data = this.state.data;
    let history = this.state.history;
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
                    Danh sách đơn hàng
                  </a>
                  {">"} Thông tin chi tiết
                </h5>
              </Col>
            </Row>

            <Row
              className="nvgh"
              style={{
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Col className="m-auto">
                <p className="titleShipper">
                  <FaRegAddressCard size={30} style={{ marginRight: "10px" }} />
                  Nhân viên giao hàng
                </p>
              </Col>
              <Col>
                <div>
                  <img
                    className="imgShipper"
                    style={{ borderRadius: 50 }}
                    src={`data:image/png;base64,${data.avtShipper}`}
                    alt="Avatar shipper"
                  />
                </div>
              </Col>
              <Col lg={8} md={6} sm={12} style={{ marginTop: "15px" }}>
                <Link
                  to={{
                    pathname: "/company/shipperdetail",
                    state: { data: data.idShipper },
                  }}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  title="Click để xem thông tin shipper"
                >
                  <p className="nameNhanvien">{data.nameShipper}</p>
                </Link>

                <p className="sodienthoai">
                  <FaPhoneAlt
                    size={20}
                    color={"#B03A2E"}
                    style={{ marginRight: "20px" }}
                  />
                  {data.phoneShipper}
                </p>
              </Col>
            </Row>
            <p className="hr"></p>
            <Row>
              <div className="card3">
                <div className="ttkh">
                  <h5 style={{ padding: "5px" }}>
                    <FaUser
                      size={25}
                      style={{ marginRight: "10px", marginBottom: "5px" }}
                    />
                    Thông tin khách hàng
                  </h5>
                </div>
                <Row>
                  <Col></Col>
                  <Col>
                    <i>Thông tin người gửi</i>
                  </Col>
                  <Col>
                    <i>Thông tin người nhận</i>
                  </Col>
                </Row>

                <Row>
                  <Col>Tên</Col>
                  <Col>
                    <b>{data.informationline.nameSender}</b>
                  </Col>
                  <Col>
                    <b>{data.informationline.nameReceiver}</b>
                  </Col>
                </Row>
                <Row>
                  <Col>Số điện thoại</Col>
                  <Col>
                    <i style={{ color: `var(--main-color)` }}>
                      {data.informationline.phoneSender}
                    </i>
                  </Col>
                  <Col>
                    <i style={{ color: `var(--main-color)` }}>
                      {data.informationline.phoneReceiver}
                    </i>
                  </Col>
                </Row>
                <div style={{ marginTop: "20px" }}>
                  <b style={{ fontSize: 14 }}>
                    <i>
                      <FaInfoCircle
                        size={15}
                        style={{ marginRight: "10px" }}
                      ></FaInfoCircle>
                      Ghi chú của khách hàng
                    </i>
                  </b>
                  <div className="note">
                    <p style={{ fontSize: 14 }}>{data.informationline.note}</p>
                  </div>
                </div>
              </div>
            </Row>
            <p className="hr"></p>
            <Row>
              <div className="card">
                <div className="ttkh">
                  <h5 style={{ padding: "5px" }}>
                    <FaRegListAlt size={25} style={{ marginRight: "10px" }} />
                    Thông tin chi tiết đơn hàng
                  </h5>
                </div>
                <Row>
                  <Col xs={4}>
                    <div>
                      <img
                        // className="avata"
                        width="300px"
                        // height="150px"
                        alt="product"
                        style={{
                          borderRadius: "10px",
                          marginLeft: "10px",
                          marginBottom: "10px",
                        }}
                        src={`data:image/png;base64,${data.informationline.img}`}
                      />
                    </div>
                  </Col>
                  <Col lg={7} md={6} sm={12}>
                    <Row>
                      <Col>
                        <div>
                          <FaCircle
                            size={9}
                            style={{
                              marginRight: "20px",
                            }}
                          />
                          <i>Tên sản phẩm:</i>
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <b className="nameProduct">
                            {data.informationline.nameProduct}
                          </b>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <FaCircle
                            size={9}
                            style={{
                              marginRight: "20px",
                            }}
                          />
                          <i>Khối lượng:</i>
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <b>{data.informationline.weightProduct}</b>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <FaCircle
                            size={9}
                            style={{
                              marginRight: "20px",
                            }}
                          />
                          <i>Số lượng:</i>
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <b>{data.informationline.numbersProduct}</b>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <FaCircle
                            size={9}
                            style={{
                              marginRight: "20px",
                            }}
                          />
                          <i>Địa chỉ lấy hàng:</i>
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <b>{data.informationline.addressSender}</b>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <FaCircle
                            size={9}
                            style={{
                              marginRight: "20px",
                            }}
                          />
                          <i>Địa chỉ giao hàng:</i>
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <b>{data.informationline.addressReceiver}</b>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <FaCircle
                            size={9}
                            style={{
                              marginRight: "20px",
                            }}
                          />
                          <i>Thời gian nhận hàng dự kiến:</i>
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <b>{data.informationline.sendDate}</b>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <FaCircle
                            size={9}
                            style={{
                              marginRight: "20px",
                            }}
                          />
                          <i>Thời gian giao hàng dự kiến:</i>
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <b>{data.informationline.receivedDate}</b>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <FaCircle
                            size={9}
                            style={{
                              marginRight: "20px",
                            }}
                          />
                          <i>Khoảng cách:</i>
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <b>{data.informationline.kilomet}</b>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <FaCircle
                            size={9}
                            style={{
                              marginRight: "20px",
                            }}
                          />
                          <i>Thu hộ:</i>
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <b>{data.informationline.priceProduct}</b>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <FaCircle
                            size={9}
                            style={{
                              marginRight: "20px",
                            }}
                          />
                          <i>Phí ship:</i>
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <b>{data.informationline.phiShip}</b>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <p className="stt">
                            <FaCheckCircle
                              color={`var(--second-color)`}
                              style={{ marginRight: "10px" }}
                            />
                            Trạng thái đơn hàng hiện tại:
                          </p>
                        </div>
                      </Col>
                      <Col>
                        <div className="stt">
                          {this.getStatus(this.state.data.status)}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Row>

            <Row>
              <div className="ttkh">
                <h5>
                  <FaShippingFast size={25} style={{ marginRight: "10px" }} />
                  Thông tin vận chuyển chi tiết
                </h5>
              </div>
            </Row>

            <Container>
              {this.state.history.map((item, index) => {
                return (
                  <div>
                    <li>
                      <span className="label-time">
                        <i>{item.time}:</i>

                        {this.getStatus(item.status)}
                      </span>

                      <div className="addressStt">
                        {" "}
                        <FaMapMarkerAlt
                          size={14}
                          style={{ marginRight: "5px" }}
                        />
                        {item.address}
                      </div>
                    </li>
                    <div className="sep"></div>
                  </div>
                );
              })}
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
