import React, { PureComponent, useState, useEffect } from "react";
import CustomerService from "../../../service/Service/CustomerService";
import ReactPaginate from "react-paginate";
import "../../../pages/css_pages/table.css";
import { Row, Col } from "react-bootstrap";
import OrderService from "../../../service/Service/OrderService";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter,
  numberFilter,
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
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
      this.setState({
        tableData: res.data,
      });
    });
  }
  //Cập nhật trạng thái
  getStatus(status) {
    switch (status) {
      case 1:
        return (
          <span className="stt1">
            <b>Shipper vừa nhận đơn hàng</b>
          </span>
        );
      case 2:
        return (
          <span className="stt1">
            <b>Đang lấy hàng</b>
          </span>
        );
      case 3:
        <span className="stt1">
          <b>Đã nhận được hàng</b>
        </span>;
      case 4:
        return (
          <span className="stt1">
            <b>Đang giao hàng</b>
          </span>
        );
      case 5:
        return (
          <span className="stt2">
            <b>Đã giao hàng thành công</b>
          </span>
        );
      case 6:
        return (
          <span className="stt3">
            <b>Đơn hàng đã hủy</b>
          </span>
        );
      case 7:
        return (
          <span className="stt4">
            <b>Giao hàng không thành công</b>
          </span>
        );
      case 8:
        return (
          <span className="stt1">
            <b>Lưu kho</b>
          </span>
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
        value: 1,
        label: "Shipper vừa nhận đơn hàng",
      },
      {
        value: 2,
        label: "Đang lấy hàng",
      },
      {
        value: 3,
        label: "Đã nhận được hàng",
      },
      {
        value: 4,
        label: "Đang giao hàng",
      },
      { value: 5, label: "Đã giao hàng thành công" },
      {
        value: 6,
        label: "Đơn hàng đã hủy",
      },
      { value: 5, label: "Giao hàng không thành công" },
      {
        value: 6,
        label: "Lưu kho",
      },
    ];
    const tableRowEvents = {
      onClick: (e, row, rowIndex) => {
        let path = "/company/orderDetail";

        this.props.history.push({
          pathname: path,
          state: { data: row },
        });
      },
      onMouseEnter: (e, row, rowIndex) => {
        console.log(`enter on row with index: ${rowIndex}`);
      },
    };

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
        dataField: "nameShipper",
        text: "Nhân viên giao hàng",
        sort: true,
        style: {
          width: "220px",
        },
        filter: textFilter({
          style: {
            height: "35px",
            borderRadius: "10px",
            borderWidth: "1px",
            width: "180px",
          },
          placeholder: "Nhập tên...",
          onClick: (e) => console.log(e),
        }),
        headerStyle: (colum, colIndex) => {
          return { width: "200px", textAlign: "center" };
        },
      },

      {
        dataField: "informationline.nameReceiver",
        text: "Khách hàng",
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
        dataField: "informationline.kilomet",
        text: "Khoảng cách",

        sort: true,
        style: {
          width: "100px",
        },

        headerStyle: (colum, colIndex) => {
          return { width: "100px", textAlign: "center" };
        },
      },

      {
        dataField: "informationline.phiShip",
        text: "Phí ship ",
        sort: true,
        style: {
          width: "70px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "70px", textAlign: "center" };
        },
      },
      {
        dataField: "informationline.priceProduct",
        text: "Thu hộ ",
        sort: true,
        style: {
          width: "70px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "70px", textAlign: "center" };
        },
      },
      {
        dataField: "time",
        text: "Thời gian",
        sort: true,
        style: {
          width: "210px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "210px", textAlign: "center" };
        },
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
        filter: selectFilter({
          options: () => selectOptionsArr,
          style: {
            height: "35px",
            borderRadius: "10px",
            borderWidth: "1px",
            width: "220px",
          },
          placeholder: "Chọn trạng thái",
          className: "test-classname",
          datamycustomattr: "datamycustomattr",
        }),

        formatter: (cell, row, rowIndex, extraData) =>
          this.getStatus(row.status),
      },
    ];
    return (
      <div className="row">
        <div className="card">
          <div className="card__body">
            <Row>
              <Col>
                <h5>Danh sách đơn hàng </h5>
              </Col>
            </Row>
            <div>
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

export default OrderCompany;
