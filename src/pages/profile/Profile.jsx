import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import ProfileApi from "../../service/Service/profileService";
import HOST from "../../service/API/Host";

import "./profile.css";

const Profile = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [image, setImage] = useState("");

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
                      <Link to={"/admin/editProfile"} className="btn">
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
    </div>
  );
};

export default Profile;
