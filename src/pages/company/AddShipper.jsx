import React, { useState, useEffect, PureComponent } from "react";
import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import Select from "react-select";
import "./style.css";
import { Link } from "react-router-dom";
import ProfileApi from "../../service/Service/profileService";
import Cookies from "js-cookie";
import ShipperService from "../../service/Service/ShipperService";
import { signUpFirebase, db, auth } from "../../service/API/firebase";
import { doc, setDoc } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";

import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import profileService from "../../service/Service/profileService";
const AddShipper = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordComfirm, setPasswordComfirm] = useState("");
  const [image, setImage] = useState("");
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWards, setListWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [cmt, setCmt] = useState("");
  const [weight, setWeight] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [addressCom, setAddressCom] = useState("");
  const [licensePlates, setLicensePlates] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);
  const [mess, setMessage] = useState("");
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
  }, []);
  const clear = () => {
    setName("");
    setProvince("");
    setDistrict("");
    setWard("");
    setNumberPlate("");
    setAddress("");
    setPhone("");
    setEmail("");
    setCmt("");
    setWeight("");
    setError("");
    setImage("");
  };
  function imageHandler(e) {
    setImage(e.target.files[0]);
  }
  const clearHandle = () => {
    setImage();
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleUpdate = async () => {
    const phoneNum =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const fullName =
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
    const cmttest = /^[0-9]{10,20}$/;
    const pass = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,50}$/;
    if (fullName.test(name) === false) {
      setError("Định dạng Họ và Tên sai");
    } else if (phoneNum.test(phone) === false) {
      setError("Định dạng số điện thoại sai");
      // } else if (pass.test(password) === false) {
      //   setError(
      //     "Mật khẩu phải: dài 8-50 ký tự, có ít nhất 1 chữ cái (a-z hoặc A-Z) và 1 số và có 1 ký tự đặc biệt"
      //   );
      // } else if (pass.test(passwordComfirm) === false) {
      //   setError(
      //     "Xác nhận Mật khẩu phải: dài 8-50 ký tự, có ít nhất 1 chữ cái (a-z hoặc A-Z) và 1 số và có 1 ký tự đặc biệt"
      //   );
    } else if (password !== passwordComfirm) {
      setError("Mật khẩu không khớp");
    } else if (cmttest.test(cmt) === false) {
      setError("Xin vui lòng nhập cmt hợp lệ!");
    } else if (email === "") {
      setError("Xin vui lòng nhập email");
    } else if (phone === "") {
      setError("Xin vui lòng nhập số điện thoại");
    } else if (pass === "") {
      setError("Xin vui lòng mật khẩu");
    } else if (cmt === "") {
      setError("Xin vui lòng nhập cmt/cccd/cmnd");
    } else if (numberPlate === "") {
      setError("Xin vui lòng nhập biển số xe");
    } else if (weight === "") {
      setError("Xin vui lòng nhập trọng tải xe");
      // } else if (addressCom === "") {
      //   setError("Xin vui lòng nhập địa chỉ công ty");
      // } else if (licensePlates === "") {
      //   setError("Xin vui lòng nhập bằng lái xe");
    } else if (province === "") {
      setError("Xin vui lòng chọn Tỉnh");
    } else if (district === "") {
      setError("Xin vui lòng chọn Huyện");
    } else if (ward === "") {
      setError("Xin vui lòng chọn Xã");
    } else {
      setError("");
      const data = {
        idRole: 1,
        idWards: ward.id,
        name: name,
        numberPlate: numberPlate,
        address: address,
        phone: phone,
        status: 3, // chờ duyệt
        passwordUser: "sdF1s6ikoq@",
        emailUser: email,
        cmtCode: cmt,
        weightCar: weight,
        idCompany: Cookies.get("id"),
        nameCompany: Cookies.get("name"),
      };

      await ShipperService.insert(data).then(async (res) => {
        if (res.data == -1) setError("Đăng ký thất bại. Email đã được đăng ký");
        else if (res.data == 0) setError("Đăng ký thất bại. Vui lòng thử lại");
        else {
          if (image != "") {
            await profileService
              .updateImg({
                id: res.data,
                file: image,
              })
              .then((response) => {
                //Sign up account for firebase
                try {
                  const passworddefault = "sdF1s6ikoq@";
                  signUpFirebase(email, passworddefault).then((res) => {
                    console.log("đã qua đây");
                    const user = auth.currentUser;
                    const userData = {
                      displayName: name,
                      email: email,
                      idRole: 1,
                    };
                    Promise.all([
                      updateProfile(user, userData),
                      setDoc(doc(db, "users", user.uid), {
                        ...userData,
                        uid: user.uid,
                      }),
                    ]);
                  });
                } catch (error) {
                  console.log(error);
                }

                if (response.data) {
                  setMessage(
                    "Đăng ký tài khoản cho nhân viên thành công.<br> Hệ thống sẽ gửi thông báo đến <b>" +
                      name +
                      "</b> thông qua  email:  <b>" +
                      email +
                      "</b>"
                  );
                  handleShow();
                  clear();
                } else {
                  setError("Đăng ký thất bại. Vui lòng thử lại");
                }
              });
            console.log(res.data);
          } else {
            setMessage(
              "Đăng ký tài khoản cho nhân viên thành công.<br> Hệ thống sẽ gửi thông báo đến <b>" +
                name +
                "</b> thông qua  email:  <b>" +
                email +
                "</b>"
            );
            handleShow();
            clear();
          }
        }
      });

      // await Authentication.registerCompany(data).then((res) => {
      //   if (res.data == -1) setError("Email đã được đăng ký");
      //   else if (res.data == 0) setError("Đăng ký thất bại. Vui lòng thử lại");
      //   else
      //     props.history.push({
      //       pathname: "/login",
      //       state: {
      //         mess: "regis",
      //       },
      //     });
      // });
    }
  };
  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: 50,

      borderRadius: 5,
      margin: 1,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 4,
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: 4,
    }),
    multiValue: (base) => ({
      ...base,
      // backgroundColor: variables.colorPrimaryLighter,
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0px 0px",
      minHeight: 30,
      height: 42,
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
      minHeight: 30,
    }),
  };
  return (
    <div>
      <div className="row">
        <div>
          <div className="card">
            <div className="card__body">
              <div className="page-general">
                <h3 className="page-header">
                  <Link to={"/company/shipper"}>
                    <i
                      class="bx bx-arrow-back"
                      style={{
                        fontSize: "2rem",
                        marginRight: 10,
                        color: "black",
                      }}
                    ></i>
                  </Link>
                  Thêm tài xế
                </h3>
                <div className="profile-content">
                  <div className="profileimage2">
                    <i
                      className="bx bxs-user"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                    <div className="title edit-tt" style={{ padding: "10px" }}>
                      {"Ảnh đại diện: "}
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      {image ? (
                        <div style={{ marginTop: 0, paddingTop: 0 }}>
                          <div
                            className="sidebar__item-inner"
                            style={{
                              position: "relative",
                              left: 200,
                            }}
                          >
                            <button onClick={clearHandle}>
                              <i className="bx bx-x"></i>
                            </button>
                          </div>
                          <img
                            className="imgSelect"
                            src={
                              image instanceof File
                                ? URL.createObjectURL(image)
                                : `data:image/png;base64,${image}`
                            }
                            // src={`data:image/png;base64,${image}`}
                            alt="avatar"
                          />
                        </div>
                      ) : (
                        <div>
                          <input
                            type="file"
                            name="image-upload"
                            accept="image/jpeg,image/png"
                            id="input"
                            onChange={imageHandler}
                          />

                          <div className="sidebar__item-inner ">
                            <i className="bx bx-image-add"></i>
                            <label htmlFor="input">Chọn ảnh</label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="profile-form">
                    <div className="form-group ">
                      <i className="bx bxs-buildings edit-tt"></i>
                      <div className="title edit-tt">{"Tên nhân viên: "}</div>
                      <div className="i-cont">
                        <input
                          className="input"
                          type="text"
                          name="name"
                          id="name"
                          value={name}
                          placeholder="Nhập Tên"
                          onChange={(e) => setName(e.target.value)}
                          onFocus={(e) => setError("")}
                        />
                      </div>
                    </div>
                    {/* <div className="form-group ">
                      <i className="bx bxs-key edit-tt"></i>
                      <div className="title edit-tt">{"Mật khẩu: "}</div>
                      <div className="i-cont">
                        <input
                          className="input"
                          type="password"
                          placeholder="Mật Khẩu"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <i className="bx bxs-key edit-tt"></i>
                      <div className="title edit-tt">
                        {"Xác nhận mật khẩu: "}
                      </div>
                      <div className="i-cont">
                        <input
                          className="input"
                          type="password"
                          placeholder="Nhập lại mật Khẩu"
                          onChange={(e) => setPasswordComfirm(e.target.value)}
                        />
                      </div>
                    </div> */}
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
                          styles={customStyles}
                          onFocus={(e) => setError("")}
                          onChange={(province) => setProvince(province)}
                        />
                        <Select
                          styles={customStyles}
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
                          onFocus={(e) => setError("")}
                        />
                        <Select
                          styles={customStyles}
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
                          onFocus={(e) => setError("")}
                        />
                        <input
                          className="input"
                          style={{ marginTop: "10px" }}
                          type="text"
                          value={address}
                          placeholder="Nhập tên đường/số nhà/hẻm"
                          onChange={(e) => setAddress(e.target.value)}
                          onFocus={(e) => setError("")}
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
                          value={email}
                          placeholder="Nhập Email "
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={(e) => setError("")}
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
                          value={phone}
                          placeholder="Nhập Số điện thoại "
                          onChange={(e) => setPhone(e.target.value)}
                          onFocus={(e) => setError("")}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <i className="bx bxs-credit-card edit-tt"></i>
                      <div className="title edit-tt">{"CMT/CCCD/CMND :"} </div>
                      <div className="i-cont">
                        <input
                          className="input"
                          type="text"
                          value={cmt}
                          placeholder="Nhập số chứng minh thư/căn cước công dân/chứng minh nhân dân"
                          onChange={(e) => setCmt(e.target.value)}
                          onFocus={(e) => setError("")}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <i className="bx bxs-truck edit-tt"></i>
                      <div className="title edit-tt">{"Tải trọng : "} </div>
                      <div className="i-cont">
                        <input
                          className="input"
                          type="number"
                          value={weight}
                          placeholder="Nhập trọng tải của xe"
                          onChange={(e) => setWeight(e.target.value)}
                          onFocus={(e) => setError("")}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <i className="bx bxs-truck edit-tt"></i>
                      <div className="title edit-tt">{"Biển số xe : "} </div>
                      <div className="i-cont">
                        <input
                          className="input"
                          type="text"
                          value={numberPlate}
                          placeholder="Nhập biển số xe"
                          onChange={(e) => setNumberPlate(e.target.value)}
                          onFocus={(e) => setError("")}
                        />
                      </div>
                    </div>
                    {/* <div className="form-group">
                      <i className="bx bxs-location-plus edit-tt"></i>
                      <div className="title edit-tt">
                        {"Địa chỉ công ty : "}{" "}
                      </div>
                      <div className="i-cont">
                        <input
                          className="input"
                          type="text"
                          placeholder="Nhập địa chỉ công ty"
                          onChange={(e) => setAddressCom(e.target.value)}
                        />
                      </div>
                    </div> */}
                    <div className="form-group form-button">
                      {(error && (
                        <Alert
                          style={{ width: "600px", borderRadius: "10px" }}
                          severity="error"
                        >
                          {error}
                        </Alert>
                      )) ||
                        (success && (
                          <Alert
                            style={{ width: "600px", borderRadius: "10px" }}
                            severity="success"
                          >
                            {success}
                          </Alert>
                        ))}
                    </div>
                    <div className="form-group form-button">
                      <button className="profile-button" onClick={handleUpdate}>
                        Thêm nhân viên
                      </button>
                      <button className="profile-button-cancel" onClick={clear}>
                        Làm mới
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
          </Modal.Header>
          <Modal.Body dangerouslySetInnerHTML={{ __html: mess }}></Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AddShipper;
