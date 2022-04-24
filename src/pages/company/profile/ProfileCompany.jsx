import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import img from "../../../assets/images/icons/icon_profile.png";

import Cookies from "js-cookie";
import ProfileApi from "../../../service/Service/profileService";
import HOST from "../../../service/API/Host";
import { Col, Row } from "react-bootstrap";
import "./profileCompany.css";
import CompanyService from "../../../service/Service/CompanyService";

const ProfileCompany = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [image, setImage] = useState("");
  const [masothue, setmaMsothue] = useState("");
  const [idW, setIdW] = useState(0);
  const [idD, setIdD] = useState(0);
  const [idP, setIdP] = useState(0);
  const [giayphepKD, setGiayPhepKD] = useState("");
  useEffect(() => {
    let data = {
      idUser: Cookies.get("id"),
    };

    CompanyService.getCompanyById(Cookies.get("id")).then((res) => {
      console.log(res.data);
      setAddress(res.data.address);
      setPhone(res.data.phone);
      setEmail(res.data.emailUser);
      setName(res.data.name);
      setWard(res.data.wards);
      setDistrict(res.data.district);
      setProvince(res.data.province);
      setImage(res.data.avatar);
      setmaMsothue(res.data.masothue);
      setIdW(res.data.idWards);
      setIdP(res.data.idProvince);
      setIdD(res.data.idDistrict);
      setGiayPhepKD(res.data.giayphepKD);
    });
  }, []);
  function imageHandler(e) {
    setImage(e.target.files[0]);
  }
  return (
    <div className="card">
      <h5 className="">Thông tin cá nhân</h5>
      <Row>
        <Col sm={4}>
          {" "}
          <div
            style={{
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <img
              style={{
                resizeMode: "contain",
                alignSelf: "center",
                borderRadius: "10px",
              }}
              className=" img-lg "
              // width="100px"
              height="400px"
              src={
                "https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-6/248586578_4369386463168252_739840101068024987_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=-M3k_4d_u2oAX8QHuTx&_nc_ht=scontent.fvca1-1.fna&oh=00_AT9KNhG9_ob9yP-F3rKl1DsHyi6P08vTO7HQm50uCLBRHQ&oe=625A6BDA"
              }
              alt="customer"
            />
          </div>
        </Col>
        <Col>
          <div style={{ alignItems: "left", alignSelf: "center" }}>
            <div className="form-group">
              <i class="bx bxs-user-pin"></i>
              <div className="labelName">{"Tên: "}</div>
              <div className="i-cont">
                <b>{name}</b>
              </div>
            </div>
            <div className="form-group pt-3">
              <i class="bx bx-envelope"></i>
              <div className="labelName">{"Email: "}</div>
              <div className="i-cont">
                <b>{email}</b>
              </div>
            </div>
            <div className="form-group pt-3">
              <i class="bx bxs-phone-call"></i>
              <div className="labelName">{"Số điện thoại: "}</div>
              <div className="i-cont">
                <b>{phone}</b>
              </div>
            </div>
            <div className="form-group pt-3">
              <i class="bx bxs-edit-location"></i>
              <div className="labelName">{"Địa chỉ: "}</div>
              <div className="i-cont">
                <b>
                  {address + ", " + ward + ", " + district + ", " + province}
                </b>
              </div>
            </div>
            <div className="form-group pt-3">
              <i class="bx bxs-edit-location"></i>
              <div className="labelName">{"Mã số thuế: "}</div>
              <div className="i-cont">
                <b>{masothue}</b>
              </div>
            </div>
            <div className="form-group ">
              <i class="bx bx-paperclip"></i>
              <div className="labelName">{"Giấy phép: "}</div>
              <div className="i-cont">
                <div>
                  <div style={{}}>
                    {(giayphepKD && (
                      <img
                        style={{
                          resizeMode: "contain",
                          alignSelf: "center",
                          borderRadius: "10px",
                        }}
                        className=" img-sm "
                        // width="100px"
                        height="200px"
                        src={`data:image/png;base64,${giayphepKD}`}
                        alt="customer"
                      />
                    )) || <b>Chưa cập nhật</b>}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group form-button">
              <div className="news-button">
                <Link to={"/company/editprofile"} className="btn">
                  Chỉnh sửa
                </Link>
              </div>
              <div
                className="news-button-cancel"
                style={{ marginLeft: "50px" }}
              >
                <Link to={"/company/changePassword"} className="btn-cancel">
                  Đổi mật khẩu
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
  /*const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tax, setTax] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    let data = {
      idUser: Cookies.get("id"),
      idRole: 2,
    };

    ProfileApi.information(data).then((res) => {
      console.log(res.data);
      setAddress(res.data.user.address);
      setPhone(res.data.user.phone);
      setEmail(res.data.user.emailUser);
      setName(res.data.user.name);
      setTax(res.data.companyResponse.masothue);
      setWard(res.data.user.wards);
      setDistrict(res.data.user.district);
      setProvince(res.data.user.province);
      setImage(res.data.user.avatar);
    });
  }, []);

  return (
    <div>
      <h2 className="page-header">Thông Tin Cá Nhân</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <div className="profile-content">
                <div className="profile-image">
                  <picture>
                    <img src={`data:image/png;base64,${image}`} alt="avatar" />
                  </picture>
                </div>
                <div className="profile-form">
                  <div className="form-group">
                    <i className="bx bxs-buildings"></i>
                    <div className="title">{"Tên công ty: "}</div>
                    <div className="i-cont">{name}</div>
                  </div>
                  <div className="form-group">
                    <i className="bx bx-body"></i>
                    <div className="title">{"Địa chỉ: "}</div>
                    <div className="i-cont">
                      {address}
                      {", "}
                      {ward}
                      {", "}
                      {district}
                      {", "}
                      {province}
                    </div>
                  </div>
                  <div className="form-group">
                    <i className="bx bxs-briefcase-alt-2"></i>
                    <div className="title">{"Mã số thuế: "} </div>
                    <div className="i-cont">{tax}</div>
                  </div>
                  <div className="form-group">
                    <i className="bx bx-mail-send"></i>
                    <div className="title">{"Email: "}</div>
                    <div className="i-cont">{email}</div>
                  </div>
                  <div className="form-group form-button">
                    <i className="bx bx-phone"></i>
                    <div className="title">{"Số điện thoại :"}</div>
                    <div className="i-cont">{phone}</div>
                  </div>
                  <div className="form-group form-button">
                    <div className="profile-button">
                      <Link to={"/company/editprofile"} className="btn">
                        Chỉnh sửa
                      </Link>
                    </div>
                    <div className="profile-button">
                      <Link to={"/changePassword"} className="btn">
                        Đổi mật khẩu
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  */
};

export default ProfileCompany;
