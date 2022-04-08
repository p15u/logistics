import React, { PureComponent, useState, useEffect } from "react";
import CustomerService from "../../../service/Service/CustomerService";
import ReactPaginate from "react-paginate";
import "../../../pages/css_pages/table.css";
import { Row, Col } from "react-bootstrap";
import OrderService from "../../../service/Service/OrderService";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export class OrderCompany extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 10,
      currentPage: 0,
      data: [],
      value: "",
      tableFilter: [],
      dataTemp: [],
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };
  componentDidMount() {
    this.getData();
  }
  //Lấy Dữ Liệu
  getData() {
    OrderService.getOrderCompany(Cookies.get("id")).then((res) => {
      var data = res.data;
      var slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgtableData: res.data,
        tableData: slice,
        dataTemp: res.data,
      });
    });
  }
  //Cập nhật trạng thái
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
  filterData = (e) => {
    if (e.target.value != "") {
      this.setState({ value: e.target.value });
      const filterTable = this.state.dataTemp.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      this.setState({ tableFilter: [...filterTable] });
    } else {
      this.setState({ value: e.target.value });
      this.setState({ dataTemp: [...this.state.dataTemp] });
    }
  };
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Row>
                <Col>
                  <h2>Danh Sách Đơn Hàng</h2>
                </Col>
                <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                  <input
                    className="searchTable"
                    type="text"
                    placeholder="Nhập dữ liệu ..."
                    value={this.state.value}
                    onChange={this.filterData}
                  />
                </Col>
              </Row>

              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Mã đơn</th>
                    <th>Shipper</th>
                    <th>Khách hàng</th>

                    <th>Khoảng cách(KM)</th>
                    <th>Phí</th>

                    <th>Thời gian</th>
                    <th>Trạng thái đơn hàng</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.dataTemp.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>#{item.idInfo}</td>
                        <td>{item.nameShipper}</td>
                        <td>{item.informationline.nameReceiver}</td>
                        <td>{item.informationline.kilomet}</td>
                        <td>{item.informationline.phiShip}</td>
                        <td>{item.time}</td>
                        <td>{this.getStatus(item.status)}</td>
                        <td>
                          <div className="item-show">
                            <Link
                              to={{
                                pathname: "/company/orderDetail",
                                state: { data: item },
                              }}
                            >
                              <i className="bx bx-show"></i>
                            </Link>
                          </div>
                        </td>

                        <td></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="table__pagination">
                <ReactPaginate
                  className="pagination"
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderCompany;
