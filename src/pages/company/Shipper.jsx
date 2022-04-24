import React, { useState, useEffect, PureComponent, Component } from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import ShipperService from "../../service/Service/ShipperService";
import CustomerService from "../../service/Service/CustomerService";
import CompanyService from "../../service/Service/CompanyService";
import active from "../../assets/images/active.png";
import inactive from "../../assets/images/inactive.jpg";
import waiticon from "../../assets/images/wait.png";
import off from "../../assets/images/off.png";
import "../css_pages/switch.css";
import { Row, Col } from "react-bootstrap";
import Cookies from "js-cookie";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter,
  numberFilter,
} from "react-bootstrap-table2-filter";
import add from "../../assets/images/add.png";
import { Link } from "react-router-dom";

export class ShipperCompany extends PureComponent {
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
    ShipperService.getShipperCompany(Cookies.get("id")).then((res) => {
      this.setState({
        tableData: res.data,
      });
    });
  }
  //Cập nhật trạng thái

  routeChange(item) {
    let path = `/company/shipperdetail`;
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
        let path = `/company/shipperdetail`;

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
            width: "270px",
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
          <div>{this.getStatus(row.status)}</div>
        ),
      },
    ];
    return (
      <div className="row">
        <div className="card">
          <div className="card__body">
            <Row>
              <Col>
                <h5>Danh sách tài xế </h5>
              </Col>
              <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link to={"/company/addshipper"}>
                  <img
                    className=" img-lg rounded-0"
                    width="30px"
                    height="30px"
                    src={add}
                    alt="customer"
                  />
                </Link>
              </Col>
            </Row>
            <div
              style={
                {
                  // position: "relative",
                  // marginLeft: "10px",
                  // height: "56px",
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
    );
  }
}
export default ShipperCompany;
