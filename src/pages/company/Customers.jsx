import React, { PureComponent, useState, useEffect } from "react";
import CustomerService from "../../service/Service/CustomerService";
import ReactPaginate from "react-paginate";
import "../../pages/css_pages/table.css";
import { Row, Col } from "react-bootstrap";
export class CustomersCompany extends PureComponent {
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

  componentDidMount() {
    setInterval(() => {
      this.getData();
    }, 100);
  }

  //Lấy Dữ Liệu
  getData() {
    CustomerService.getCustomer().then((res) => {
      var slice = res.data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.setState({
        orgtableData: res.data,
        tableData: slice,
      });
      if (this.state.value != "") {
        this.setState({
          pageCount: Math.ceil(
            this.state.tableFilter.length / this.state.perPage
          ),
        });
      } else {
        this.setState({
          pageCount: Math.ceil(res.data.length / this.state.perPage),
        });
      }
    });
  }
  //Cập nhật trạng thái

  render() {
    const filterData = (e) => {
      if (e.target.value != "") {
        this.setState({ value: e.target.value });
        const filterTable = this.state.tableData.filter((o) =>
          Object.keys(o).some((k) =>
            String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
        this.setState({ tableFilter: [...filterTable] });
      } else {
        this.setState({ value: e.target.value });
      }
    };
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Row>
                <Col>
                  <h2>Danh sách khách hàng</h2>
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
                    <th>Trạng Thái</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.value.length > 0
                    ? this.state.tableFilter.map((item) => {
                        return (
                          <tr key={item.idUser}>
                            <td>{item.idUser}</td>
                            <td>
                              <img
                                className=" img-lg rounded-0"
                                width="100px"
                                height="100px"
                                src={`data:image/png;base64,${item.avatar}`}
                                alt="customer"
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.emailUser}</td>
                            <td>
                              {item.address}, {item.wards}, {item.district},{" "}
                              {item.province}
                            </td>

                            <td>
                              {item.status === 0 ? (
                                <button className="badge badge-danger">
                                  Ngưng hoạt động
                                </button>
                              ) : (
                                <button className="badge badge-success">
                                  {" "}
                                  Hoạt động
                                </button>
                              )}
                            </td>
                            <td></td>
                          </tr>
                        );
                      })
                    : this.state.tableData.map((item) => {
                        return (
                          <tr key={item.idUser}>
                            <td>{item.idUser}</td>
                            <td>
                              <img
                                className=" img-lg rounded-0"
                                width="100px"
                                height="100px"
                                src={`data:image/png;base64,${item.avatar}`}
                                alt="customer"
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.emailUser}</td>
                            <td>
                              {item.address}, {item.wards}, {item.district},{" "}
                              {item.province}
                            </td>

                            <td>
                              {item.status === 0 ? (
                                <button className="badge badge-danger">
                                  Ngưng hoạt động
                                </button>
                              ) : (
                                <button className="badge badge-success">
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

export default CustomersCompany;
