import React, { PureComponent, useState, useEffect } from "react";
import CustomerService from "../service/Service/CustomerService";
import ReactPaginate from "react-paginate";
import "./css_pages/table.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter,
  numberFilter,
} from "react-bootstrap-table2-filter";
import { Row, Col } from "react-bootstrap";
import active from "../assets/images/active.png";
import inactive from "../assets/images/inactive.jpg";
import waiticon from "../assets/images/wait.png";
import off from "../assets/images/off.png";
import paginationFactory from "react-bootstrap-table2-paginator";
export class Customers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
    };
  }

  componentDidMount() {
    // setInterval(() => {
    this.getData();
    // }, 100);
  }

  //Lấy Dữ Liệu
  getData() {
    CustomerService.getCustomer().then((res) => {
      this.setState({
        tableData: res.data,
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
  };
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

  render() {
    const options = {
      // pageStartIndex: 0,
      sizePerPage: 10,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true,
    };
    const selectOptionsArr = [
      {
        value: 0,
        label: "Ngưng hoạt động",
      },
      {
        value: 1,
        label: "Đang hoạt động",
      },
      {
        value: 2,
        label: "Đang tắt",
      },
      {
        value: 3,
        label: "Đang chờ duyệt",
      },
    ];
    const tableRowEvents = {
      onClick: (e, row, rowIndex) => {
        let path = `/admin/customerdetail`;

        this.props.history.push({
          pathname: path,
          state: { data: row.idUser },
        });
      },
      onMouseEnter: (e, row, rowIndex) => {
        console.log(`enter on row with index: ${rowIndex}`);
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
            width: "190px",
          },
          placeholder: "Nhập tên...",
          onClick: (e) => console.log(e),
        }),
        headerStyle: (colum, colIndex) => {
          return { width: "200px", textAlign: "center" };
        },
      },
      {
        dataField: "phone",
        text: "SDT",
        style: {
          width: "120px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "120px", textAlign: "center" };
        },
      },
      {
        dataField: "emailUser",
        text: "Email",
        style: {
          width: "180px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "180px", textAlign: "center" };
        },
      },
      {
        dataField: "address",
        text: "Địa chỉ \n",
        align: "left",
        style: {
          width: "300px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "300px", textAlign: "center" };
        },
        filter: textFilter({
          style: {
            height: "35px",
            borderRadius: "10px",
            borderWidth: "1px",
            width: "300px",
          },
          placeholder: "Nhập địa chỉ...",
          onClick: (e) => console.log(e),
        }),
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
          paddingLeft: "30px",
        },
        align: "left",

        headerStyle: (colum, colIndex) => {
          return { width: "200px", textAlign: "center" };
        },
        filter: selectFilter({
          options: () => selectOptionsArr,
          style: {
            height: "35px",
            borderRadius: "10px",
            borderWidth: "1px",
            width: "160px",
          },

          placeholder: "Chọn trạng thái",
          className: "test-classname",
          datamycustomattr: "datamycustomattr",
        }),

        formatter: (cell, row, rowIndex, extraData) => (
          <div>
            {this.getStatus(row.status)}
            {/* {row.status === 0 ? (
              <div>
                <p>
                  Ngưng hoạt động
                  <img
                    height={20}
                    width={20}
                    style={{ marginLeft: 5 }}
                    src={inactive}
                    alt="inactive"
                  />
                </p>
              </div>
            ) : (
              <div>
                <p>
                  Hoạt động
                  <img
                    height={20}
                    width={20}
                    style={{ marginLeft: 5 }}
                    src={active}
                    alt="active"
                  />
                </p>
              </div>
            )} */}
          </div>
        ),
      },
    ];
    return (
      <div className="row">
        <div className="card">
          <div className="card__body">
            <Row>
              <Col>
                <h5>Danh sách khách hàng </h5>
              </Col>
            </Row>
            <div
              style={
                {
                  // position: "relative",
                  // height: "565px",
                  // width: "1110px",
                  // overflow: "scroll",
                  // marginBottom: "10px",
                }
              }
            >
              <BootstrapTable
                keyField="idUser"
                data={this.state.tableData}
                columns={columns}
                rowEvents={tableRowEvents}
                filter={filterFactory()}
                defaultPageSize={20}
                pagination={paginationFactory(options)}
                bordered={false}
              />
            </div>
          </div>
        </div>
      </div>
      // </div>
    );
  }
}

export default Customers;
