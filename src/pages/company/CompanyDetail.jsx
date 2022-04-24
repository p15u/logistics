import React, { PureComponent } from "react";
import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import "./../css_pages/user.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import OrderService from "../../service/Service/OrderService";
import ShipperService from "../../service/Service/ShipperService.js";
import CompanyService from "../../service/Service/CompanyService";
export class CompanyDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataCompany: [],
      data: {
        name: "",
        phone: "",
        email: "",
        address: "",
        image: "",
        status: 0,
        idCompany: 0,
        idUser: 0,
        wards: "",
        district: "",
        province: "",
        avatar: "",
        masothue: "",
        giayphepKD: "",
      },
      idUser: this.props.location.state.data,

      //Thong tin hang hoa
      dataInfo: [],
      //Thong tin tai xe
      dataShipper: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  //Lấy Dữ Liệu
  getData() {
    console.log(this.state.idUser);
    CompanyService.getCompanyById(this.state.idUser).then((res) => {
      console.log(res.data);
      this.setState({ data: res.data });
    });

    // OrderService.getOrder().then((res) => {
    //   this.setState({
    //     dataInfo: res.data,
    //   });
    // });

    ShipperService.getShipperCompany(this.state.idUser).then((res) => {
      this.setState({
        dataShipper: res.data,
      });
    });
  }
  routeChangeShipper(item) {
    let path = `/admin/shipperdetail`;
    console.log(item);
    this.props.history.push({
      pathname: path,
      state: { data: item.idUser },
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <h2 className="page-header">Thông Tin Doanh Nghiệp</h2>
            <div className="userContainer">
              <div className="userShowLeft">
                <div className="userShowTop">
                  <img
                    src={`data:image/png;base64,${this.state.data.avatar}`}
                    alt="avatar"
                    className="imageAvatar"
                  />
                </div>
                <div className="userShowTopTitle">
                  <span className="userShowUsername">
                    {this.state.data.name}
                  </span>
                  <span className="userShowUserTitle">
                    <i>
                      <b>Mã tài khoản : #{this.state.data.idUser} </b>
                    </i>
                  </span>
                </div>
                <Link to={"/admin/companyupdate"}>
                  <div className="userUpdateRight">
                    <button className="userUpdateButton">Hoạt động</button>
                  </div>
                </Link>
              </div>
              <div className="userShow">
                <span className="userShowTitle">Chi Tiết Doanh Nghiệp</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />

                  <span className="userShowInfoTitle">
                    {this.state.data.name}
                  </span>
                </div>
                <div className="userShowInfo">
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {this.state.data.phone}
                  </span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {this.state.data.emailUser}
                  </span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {this.state.data.address}
                  </span>
                </div>
              </div>
              <div className="userShow">
                <span className="userShowTitle">Chi Tiết Tài Khoản</span>
                <div className="userShowInfo">
                  <span className="userShowUsername">ID : </span>
                  <span className="userShowInfoTitle">
                    {this.state.data.idCompany}
                  </span>
                </div>
                <div className="userShowInfo">
                  <span className="userShowUsername">Mã Số Thuế : </span>
                  <span className="userShowInfoTitle">
                    {this.state.data.masothue}
                  </span>
                </div>
                <div className="userShowInfo">
                  <span className="userShowUsername">Giấy Phép KD : </span>
                  <div className="userShowTop">
                    <img
                      src={`data:image/png;base64,${this.state.data.giayphepKD}`}
                      alt="Giấy phép kinh doanh"
                      className="img-lg rounded-0"
                      width="130px"
                      // height="100px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card">
              <div className="card__header">
                <h3>Nhân Viên Công Ty</h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Mã Nhân Viên</th>
                    <th>Tên</th>
                    <th>Số Điện Thoại</th>
                    <th>Email</th>
                    <th>Địa Chỉ</th>
                    <th>Số CMT</th>
                    <th>Trọng Tải</th>
                    <th>Biển Số</th>
                    <th>Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.dataShipper.map((item) => {
                    return (
                      <tr
                        key={item.idShipper}
                        onClick={() => {
                          this.routeChangeShipper(item);
                        }}
                      >
                        <td>{item.idShipper}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.emailUser}</td>
                        <td>
                          {item.address},{item.wards},{item.district},
                          {item.province}
                        </td>
                        <td>{item.cmtCode}</td>
                        <td>{item.weightCar}</td>
                        <td>{item.numberPlate}</td>
                        <td>{item.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyDetail;
