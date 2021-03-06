import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Chart from "react-apexcharts";

import { useSelector } from "react-redux";

import StatusCard from "../../components/status-card/StatusCard";

import Table from "../../components/table/Table";

import Badge from "../../components/badge/Badge";

import statusCards from "../../assets/JsonData/status-card-data.json";
import Cookies from "js-cookie";
import CustomerService from "../../service/Service/CustomerService";
import ShipperService from "../../service/Service/ShipperService";
import HistoryService from "../../service/Service/HistoryService";
const topCustomers = {
  head: ["Tên khách hàng", "Số điện thoại", "Trạng thái"],
};

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};

const DashboardCompany = () => {
  const [dataShip, setDataShip] = useState([]);
  const [dataUser, setDataU] = useState([]);
  const [dataShipper, setDataS] = useState([]);
  const [dataCompany, setDataC] = useState([]);
  const [dataCustomer, setDataCustomer] = useState([]);
  const [dataListCom, setDataListCom] = useState([]);
  const [dataListCancel, setDataListCancel] = useState([]);
  useEffect(() => {
    const idUser = Cookies.get("id");

    CustomerService.getCustomerCompany(idUser).then((response) => {
      setDataU(response.data.length);
    });
    ShipperService.getShipperCompany(idUser).then((response) => {
      setDataS(response.data.length);
    });
    CustomerService.getCustomerCompany(idUser).then((response) => {
      if (response.data.length >= 6) {
        const lastX = 5;
        const db = response.data.filter(
          (val, index, arr) => index > arr.length - lastX - 1
        );
        setDataCustomer(db);
      } else {
        setDataCustomer(response.data);
      }
    });
    ShipperService.getShipperCompany(idUser).then((response) => {
      if (response.data.length >= 6) {
        const lastX = 5;
        const db = response.data.filter(
          (val, index, arr) => index > arr.length - lastX - 1
        );
        setDataShip(db);
      } else {
        setDataShip(response.data);
      }
    });
    HistoryService.getOrderByTimeCompany(5, idUser).then((response) => {
      setDataListCom(response.data);
    });
    HistoryService.getOrderByTimeCompany(6, idUser).then((response) => {
      setDataListCancel(response.data);
    });
  }, []);
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);
  const chartOptions = {
    series: [
      {
        name: "Đã giao",
        data: dataListCom,
      },
      {
        name: "Đã hủy",
        data: dataListCancel,
      },
    ],
    options: {
      color: ["#6ab04c", "#2980b9"],
      chart: {
        background: "transparent",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
      },
      legend: {
        position: "top",
      },
      grid: {
        show: false,
      },
    },
  };
  return (
    <div>
      <h2 className="page-header">Trang chủ</h2>
      <div className="row">
        <div className="col-3">
          <div className="">
            {/* <div className="col-6" key={1}>
              <StatusCard
                icon="bx bx-user"
                count={dataUser + dataShipper + dataCompany}
                title="Tổng số người dùng"
              />
            </div> */}
            <div className="" key={2}>
              <StatusCard
                icon="bx bx-user"
                count={dataUser}
                title="Tổng số khách hàng"
              />
            </div>
            <div className="" key={3}>
              <StatusCard
                icon="bx bx-user"
                count={dataShipper}
                title="Tổng số người giao hàng"
              />
            </div>
            {/* <div className="col-6" key={4}>
              <StatusCard
                icon="bx bx-user"
                count={dataCompany}
                title="tổng số doanh nghiệp"
              />
            </div> */}
          </div>
        </div>
        <div className="col-9">
          <div className="card full-height">
            {/* chart */}
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...chartOptions.options,
                      theme: { mode: "dark" },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: "light" },
                    }
              }
              series={chartOptions.series}
              type="line"
              height="100%"
            />
          </div>
        </div>
        <div className="col-5">
          <div className="card ht">
            <div className="card__header ">
              <span style={{ fontSize: 20, fontWeight: "bold" }}>
                Khách hàng
              </span>
              <Link to={"/company/customers"} title="Nhấn để hiển thị thông tin">
                <span
                  style={{ fontSize: 14, float: "right", cursor: "pointer" }}
                >
                  Tất cả<i className="bx bx-chevrons-right"></i>{" "}
                </span>
              </Link>
            </div>
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Số Điện Thoại</th>
                    <th>Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {dataCustomer.map((item) => {
                    return (
                      <tr key={item.idUser}>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>

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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* <Table
                                headData={topCustomers.head}
                                renderHead={(item, index) => renderCusomerHead(item, index)}
                                bodyData={topCustomers.}
                                renderBody={(item, index) => renderCusomerBody(item, index)}
                            /> */}
            </div>
          </div>
        </div>
        <div className="col-7">
          <div className="card ht">
            <div className="card__header">
              <span style={{ fontSize: 20, fontWeight: "bold" }}>
                Người giao hàng
              </span>
              <Link to={"/company/shipper"} title="Nhấn để hiển thị thông tin">
                <span
                  style={{ fontSize: 14, float: "right", cursor: "pointer" }}
                >
                  Tất cả<i className="bx bx-chevrons-right"></i>{" "}
                </span>
              </Link>
            </div>
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Số Điện Thoại</th>
                    <th>Email</th>
                    <th>Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {dataShip.map((item) => {
                    return (
                      <tr key={item.idUser}>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.emailUser}</td>
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DashboardCompany;
