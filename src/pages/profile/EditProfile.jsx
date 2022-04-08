import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import ProfileApi from "../../service/Service/profileService";
import Alert from "@material-ui/lab/Alert";
import Select from "react-select";

import "./profile.css";
import HOST from "../../service/API/Host";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWards, setListWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  useEffect(() => {
    ProfileApi.getProvince().then((res) => {
      setListProvince(res.data);
    });
    ProfileApi.getDistrict().then((res) => {
      setListDistrict(res.data);
    });
    ProfileApi.getWards().then((res) => {
      setListWards(res.data);
    });

    ProfileApi.information({ idUser: Cookies.get("id") }).then((res) => {
      setAddress(res.data.user.address);
      setPhone(res.data.user.phone);
      setEmail(res.data.user.emailUser);
      setName(res.data.user.name);
      setWard(res.data.user.idWards);
      setImage(res.data.user.avatar);
    });
  }, []);

  useEffect(() => {
    setDistrict("");
  }, [province]);

  useEffect(() => {
    setWard("");
  }, [district]);

  function imageHandler(e) {
    setImage(e.target.files[0]);
  }

  const handleUpdate = async () => {
    const phoneNum =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const fullName =
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
    if (image instanceof File) {
      await ProfileApi.updateImg({
        id: Cookies.get("id"),
        file: image,
      });
      const r = await ProfileApi.information({ idUser: Cookies.get("id") });
      Cookies.set("avatar", r.data.user.avatar);
      window.location.reload();
    }
    if (phoneNum.test(phone) === false) {
      setError("Định dạng số điện thoại sai");
    } else if (fullName.test(name) === false) {
      setError("Định dạng Họ và Tên sai");
    } else if (province === "") {
      setError("Xin vui lòng chọn Tỉnh");
    } else if (district === "") {
      setError("Xin vui lòng chọn Huyện");
    } else if (ward === "") {
      setError("Xin vui lòng chọn Xã");
    } else {
      setError("");
      const r = await ProfileApi.information({ idUser: Cookies.get("id") });
      const data = {
        idUser: Cookies.get("id"),
        name: name || r.data.user.name,
        address: address || r.data.user.address,
        phone: phone || r.data.user.phone,
        emailUser: r.data.user.emailUser,
        idWards: ward.id || r.data.user.idWards,
      };
      await ProfileApi.update(data);
      setSuccess("Cập Nhật Thành Công!");
    }
  };

  return (
    <div>
      <h2 className="page-header">Chỉnh Sửa Thông Tin Cá Nhân</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <div className="profile-content">
                <div className="profile-image">
                  <picture>
                    <img
                      src={
                        image instanceof File
                          ? URL.createObjectURL(image)
                          : `data:image/png;base64,${image}`
                      }
                      alt="avatar"
                    />
                    <input
                      type="file"
                      name="image-upload"
                      accept="image/jpeg,image/png"
                      id="input"
                      onChange={imageHandler}
                    />
                  </picture>
                  <div className="sidebar__item-inner ">
                    <i className="bx bx-image-add"></i>
                    <label htmlFor="input">Chọn hình</label>
                  </div>
                </div>
                <div className="profile-form">
                  <div className="form-group">
                    <i className="bx bx-user-circle edit-tt"></i>
                    <div className="title edit-tt">{"Họ và Tên: "}</div>
                    <div className="i-cont">
                      <input
                        className="input"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nhập Tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <i className="bx bx-body edit-tt"></i>
                    <div className="title edit-tt">{"Địa chỉ: "}</div>
                    <div className="i-cont">
                      <Select
                        placeholder="Chọn tỉnh/thành phố"
                        value={province}
                        options={listProvince.map((item) => ({
                          ...item,
                          value: item.id,
                          label: item.name,
                        }))}
                        onChange={(province) => setProvince(province)}
                      />
                      <Select
                        className="selectOption"
                        placeholder="Chọn huyện/quận"
                        value={district}
                        isDisabled={!province}
                        options={listDistrict
                          .filter((d) => d.idProvince === province.id)
                          .map((item) => ({
                            ...item,
                            value: item.id,
                            label: item.name,
                          }))}
                        onChange={(district) => setDistrict(district)}
                      />
                      <Select
                        placeholder="Chọn xã/phường"
                        value={ward}
                        isDisabled={!district}
                        options={listWards
                          .filter((d) => d.idDistrict === district.id)
                          .map((item) => ({
                            ...item,
                            value: item.id,
                            label: item.name,
                          }))}
                        onChange={(ward) => setWard(ward)}
                      />
                      <input
                        className="input "
                        style={{ marginTop: "10px" }}
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Nhập tên đường/số nhà/hẻm"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <i className="bx bx-mail-send edit-tt"></i>
                    <div className="title edit-tt">{"Email: "}</div>
                    <div className="i-cont">
                      <input
                        className="input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Nhập Email"
                        disabled
                        value={email}
                      />
                    </div>
                  </div>
                  <div className="form-group form-button">
                    <i className="bx bx-phone edit-tt"></i>
                    <div className="title edit-tt">{"Số điện thoại :"}</div>
                    <div className="i-cont">
                      <input
                        className="input"
                        type="tel"
                        name="tel"
                        id="tel"
                        placeholder="Nhập Số điện thoại "
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group form-button">
                    {(error && <Alert severity="error">{error}</Alert>) ||
                      (success && <Alert severity="success">{success}</Alert>)}
                  </div>
                  <div className="form-group form-button">
                    <button className="profile-button" onClick={handleUpdate}>
                      Cập nhật
                    </button>
                    <div className="profile-button-cancel">
                      <Link to={"/admin/profile"} className="btn-cancel">
                        Hủy
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

export default EditProfile;
