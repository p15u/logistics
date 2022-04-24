import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import ProfileApi from "../../service/Service/profileService";
import HOST from "../../service/API/Host";

import "./profile.css";
import { Col, Row } from "react-bootstrap";

const Profile = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [image, setImage] = useState("");
  const [idW, setIdW] = useState(0);
  const [idD, setIdD] = useState(0);
  const [idP, setIdP] = useState(0);

  useEffect(() => {
    let data = {
      idUser: Cookies.get("id"),
    };

    ProfileApi.information(data).then((res) => {
      console.log(res.data);
      setAddress(res.data.user.address);
      setPhone(res.data.user.phone);
      setEmail(res.data.user.emailUser);
      setName(res.data.user.name);
      setWard(res.data.user.wards);
      setDistrict(res.data.user.district);
      setProvince(res.data.user.province);
      setImage(res.data.user.avatar);
      setIdW(res.data.user.idWards);
      setIdP(res.data.user.idProvince);
      setIdD(res.data.user.idDistrict);
    });
  }, []);
  function imageHandler(e) {
    setImage(e.target.files[0]);
  }
  return (
    /* <div>
      <h2 className="page-header">Thông Tin Cá Nhân</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <div className="profile-content">
                <div className="profile-image">
                  <div>
                    <img src={`data:image/png;base64,${image}`} alt="avatar" />
                  </div>
                </div>
                <div className="profile-form">
                  <div className="form-group">
                    <i className="bx bx-user-circle"></i>
                    <div className="title">{"Tên: "}</div>
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
                      <Link to={"/admin/â"} className="btn">
                        Chỉnh sửa
                      </Link>
                    </div>
                    <div className="profile-button">
                      <Link to={"/changepassword"} className="btn">
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
    </div>*/
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
              src={`data:image/png;base64,${image}`}
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
            <div
              className="form-group form-button"
              style={{ paddingTop: "150px" }}
            >
              <div className="news-button">
                <Link to={"/admin/editProfile"} className="btn">
                  Chỉnh sửa
                </Link>
              </div>
              <div
                className="news-button-cancel"
                style={{ marginLeft: "50px" }}
              >
                <Link to={"/admin/changepassword"} className="btn-cancel">
                  Đổi mật khẩu
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
