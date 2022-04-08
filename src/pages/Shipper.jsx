import React, { useState, useEffect, PureComponent } from "react";

import ShipperService from "../service/Service/ShipperService";
import CustomerService from "../service/Service/CustomerService";
import "./css_pages/switch.css";
import ReactPaginate from "react-paginate";

import { Row, Col } from "react-bootstrap";
export class Shipper extends PureComponent {
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

  loadMoreData() {
    const data = this.state.orgtableData;

    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
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
    ShipperService.getShipper().then((res) => {
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
  updateStatus = (item) => {
    if (item.status === 0) {
      item.status = 1;
    } else {
      item.status = 0;
    }
    CustomerService.updateStatus(item);
    //axios.post(`${HOST}/user/changeStatus`, item);
  };
  routeChange(item) {
    let path = `/admin/shipperdetail`;
    console.log(item);
    this.props.history.push({
      pathname: path,
      state: { data: item.idUser },
    });
  }

  render() {
    const filterData = (e) => {
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
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Row>
                <Col>
                  <h2>Tài xế</h2>
                </Col>
                <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                  <input
                    className="searchTable"
                    type="text"
                    placeholder="Nhập dữ liệu ..."
                    value={this.state.value}
                    onChange={filterData}
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
                    <th>Thuộc công ty</th>
                    <th>Chứng minh nhân dân</th>
                    <th>Cân nặng xe</th>
                    <th>Giấy phép lái xe</th>
                    <th>Biển số xe</th>
                    <th>Trạng Thái</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.value.length > 0
                    ? this.state.tableFilter.map((item) => {
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
                            <td>{item.idCompany}</td>
                            <td>{item.cmtCode}</td>
                            <td>{item.weightCar}</td>
                            <td
                              style={{
                                textAlign: "center",
                              }}
                            >
                              <img
                                className=" img-lg rounded-0"
                                // width="100px"
                                height="100px"
                                src={`data:image/png;base64,${item.licensePlates}`}
                                alt="Giấy phép"
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
                                  {" "}
                                  Hoạt động
                                </button>
                              )}
                            </td>
                            <td></td>
                          </tr>
                        );
                      })
                    : this.state.dataTemp.map((item) => {
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
                            <td>{item.idCompany}</td>
                            <td>{item.cmtCode}</td>
                            <td>{item.weightCar}</td>
                            <td
                              style={{
                                textAlign: "center",
                              }}
                            >
                              <img
                                className=" img-lg rounded-0"
                                // width="100px"
                                height="100px"
                                src={`data:image/png;base64,${item.licensePlates}`}
                                alt="Giấy phép"
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
                                  {" "}
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

export default Shipper;
