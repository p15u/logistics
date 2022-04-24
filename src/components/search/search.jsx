import React, { PureComponent } from "react";
import "./search.css";
import "../topnav/topnav.css";
import CustomerService from "../../service/Service/CustomerService";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import OutsideAlerter from "./OutsideAlerter";

export class SearchBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      Filter: [],
      dataAll: [],
      id: "",
      dataCompany: [],
      visible: false,
    };
  }
  //Lấy Dữ Liệu
  getData() {
    CustomerService.getAllAccount().then((res) => {
      this.setState({
        dataAll: res.data,
        id: Cookies.get("role"),
      });
    });
  }
  componentDidMount() {
    // setInterval(() => {
    this.getData();
    // }, 100);
  }
  onChange = () => {
    this.setState({ ...this.state, Filter: [] });
  };
  linkUser = (value) => {
    Cookies.set("idResultSearch", value);
  };
  closeHandle = () => {
    this.setState({ ...this.state, visible: false });
  };
  openHandle = () => {
    this.setState({ ...this.state, visible: true });
  };
  render() {
    const filterData = (e) => {
      this.openHandle();
      if (e.target.value != "") {
        this.setState({ value: e.target.value });
        const filter = this.state.dataAll.filter((o) =>
          Object.keys(o).some((k) =>
            String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
        this.setState({ Filter: [...filter] });
      } else {
        this.setState({ value: e.target.value });
        this.setState({ dataAll: [...this.state.dataAll] });
      }
    };
    return (
      <div onFocus={this.openHandle}>
        <div className="topnav__search">
          <input
            type="text"
            placeholder="Nhập dữ liệu ..."
            value={this.state.value}
            onChange={filterData}
          />
        </div>
        {this.state.visible && (
          <div>
            {" "}
            {this.state.Filter.length != 0 &&
              this.state.value.length > 0 &&
              this.state.id == "__ad" && (
                <div className="dataResult">
                  {this.state.Filter.slice(0, 15).map((value, key) => {
                    return (
                      <a
                        onClick={this.closeHandle}
                        style={{ textDecoration: "none", color: "black" }}
                        className="dataItem"
                        target="_blank"
                      >
                        <p>
                          {value.idRole == 1 ? (
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                              to={{
                                pathname: "/admin/shipperdetail",
                                state: { data: value.idUser },
                              }}
                            >
                              Nhân viên : {value.name}
                            </Link>
                          ) : value.idRole == 2 ? (
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                              to={{
                                pathname: "/admin/customerdetail",
                                state: { data: value.idUser },
                              }}
                            >
                              Khách hàng : {value.name}
                            </Link>
                          ) : (
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                              to={{
                                pathname: "/admin/companydetail",
                                state: { data: value.idUser },
                              }}
                            >
                              Doanh nghiệp : {value.name}
                            </Link>
                          )}
                        </p>
                      </a>
                    );
                  })}
                </div>
              )}
            {this.state.Filter.length != 0 &&
              this.state.value.length > 0 &&
              this.state.id == "__cp" && (
                <div className="dataResult">
                  {this.state.Filter.slice(0, 15).map((value, key) => {
                    return (
                      <a
                        onClick={this.closeHandle}
                        style={{ textDecoration: "none", color: "black" }}
                        className="dataItem"
                        target="_blank"
                      >
                        <p>
                          {value.idRole == 1 ? (
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                              // to={"/company/shipperdetail/" + value.idUser}
                              to={{
                                pathname: "/company/shipperdetail",
                                state: { data: value.idUser },
                              }}
                            >
                              Nhân viên : {value.name}
                            </Link>
                          ) : value.idRole == 2 ? (
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                              to={{
                                pathname: "/company/customerdetail",
                                state: { data: value.idUser },
                              }}
                              //   to={"/company/customerdetail/" + value.idUser}
                            >
                              Khách hàng : {value.name}
                            </Link>
                          ) : (
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              Không thấy thông tin
                            </Link>
                          )}
                        </p>
                      </a>
                    );
                  })}
                </div>
              )}
          </div>
        )}
      </div>
    );
  }
}

export default SearchBar;
