import React, { useState, useEffect, PureComponent, Component } from "react";

import ShipperService from "../../service/Service/ShipperService";
import CustomerService from "../../service/Service/CustomerService";
import CompanyService from "../../service/Service/CompanyService";
import "../css_pages/switch.css";
import { Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
export class ShipperCompany extends Component {
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
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }
  routeChange(item) {
    let path = `/company/shipperdetail`;

    this.props.history.push({
      pathname: path,
      state: { data: item.idUser },
    });
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
        this.getData();
      }
    );
  };

  loadMoreData() {
    const data = this.state.orgtableData;

    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      tableData: slice,
    });
  }

  componentDidMount() {
    // setInterval(() => {
    this.getData();
    // }, 100);
  }

  //Lấy Dữ Liệu
  getData() {
    ShipperService.getShipperCompany(Cookies.get("id")).then((res) => {
      var slice = res.data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.setState({
        orgtableData: res.data,
        tableData: slice,
      });
      this.setState({
        tableFilter: [...this.state.tableData],
        pageCount: Math.ceil(
          this.state.orgtableData.length / this.state.perPage
        ),
      });
    });
  }
  //Cập nhật trạng thái
  updateStatus = (item) => {
    if (item.status === 0) {
      item.status = 1;
    } else {
      item.status = 0;
    }
    CustomerService.updateStatus(item);
    //axios.post(`${HOST}/user/changeStatus`, item);
  };
  filterData = (e) => {
    if (e.target.value != "") {
      this.setState({ value: e.target.value });
      const filterTable = this.state.tableData.filter((o) =>
        o.name.toLowerCase().includes(e.target.value.toLowerCase())
      );

      this.setState({
        tableFilter: [...filterTable],
      });
      this.setState({
        pageCount: Math.ceil(
          this.state.tableFilter.length / this.state.perPage
        ),
      });
    } else {
      this.setState({ value: e.target.value });
      this.setState({
        tableFilter: [...this.state.tableData],
        pageCount: Math.ceil(
          this.state.orgtableData.length / this.state.perPage
        ),
      });
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
                  <h2>Danh sách tài xế </h2>
                </Col>
                <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                  <input
                    className="searchTable"
                    type="text"
                    placeholder="Nhập tên..."
                    value={this.state.value}
                    onChange={this.filterData}
                  />
                </Col>
              </Row>
              <table>
                <thead>
                  <tr>
                    <th>Mã số</th>
                    <th>Hình đại diện</th>
                    <th>Tên</th>
                    <th>Số Điện Thoại</th>
                    <th>Email</th>
                    <th>Địa Chỉ</th>
                    <th>Chứng minh nhân dân</th>
                    <th>Cân nặng xe</th>
                    <th>Giấy phép lái xe</th>
                    <th>Biển số xe</th>
                    <th>Trạng Thái</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tableFilter.map((item) => {
                    return (
                      <tr
                        key={item.idUser}
                        onClick={() => {
                          this.routeChange(item);
                        }}
                      >
                        <td>{item.idUser}</td>
                        <td
                          style={{
                            textAlign: "center",
                          }}
                        >
                          <img
                            className=" img-lg rounded-0"
                            // width="100px"
                            height="100px"
                            src={`data:image/png;base64,${item.avatar}`}
                            alt="avatar"
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.emailUser}</td>
                        <td>
                          {item.address}, {item.wards}, {item.district},{" "}
                          {item.province}
                        </td>
                        <td>{item.cmtCode}</td>
                        <td>{item.weightCar}</td>
                        <td
                          style={{
                            textAlign: "center",
                            alignContent: "center",
                            alignSelf: "center",
                            position: "absolute",
                          }}
                        >
                          <img
                            className=" img-lg rounded-0"
                            // width="100px"
                            height="100px"
                            src={`data:image/png;base64,${item.licensePlates}`}
                            alt="avatar"
                          />
                        </td>
                        <td>{item.numberPlate}</td>
                        <td>
                          {item.status === 0 ? (
                            <button
                              className="badge badge-danger"
                              onClick={() => this.updateStatus(item)}
                            >
                              Ngưng hoạt động
                            </button>
                          ) : (
                            <button
                              className="badge badge-success"
                              onClick={() => this.updateStatus(item)}
                            >
                              Hoạt động
                            </button>
                          )}
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

export default ShipperCompany;
