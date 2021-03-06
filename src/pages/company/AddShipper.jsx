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
      /^[a-zA-Z??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\s\W|_]+$/;
    const cmttest = /^[0-9]{10,20}$/;
    const pass = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,50}$/;
    if (fullName.test(name) === false) {
      setError("?????nh d???ng H??? v?? T??n sai");
    } else if (phoneNum.test(phone) === false) {
      setError("?????nh d???ng s??? ??i???n tho???i sai");
      // } else if (pass.test(password) === false) {
      //   setError(
      //     "M???t kh???u ph???i: d??i 8-50 k?? t???, c?? ??t nh???t 1 ch??? c??i (a-z ho???c A-Z) v?? 1 s??? v?? c?? 1 k?? t??? ?????c bi???t"
      //   );
      // } else if (pass.test(passwordComfirm) === false) {
      //   setError(
      //     "X??c nh???n M???t kh???u ph???i: d??i 8-50 k?? t???, c?? ??t nh???t 1 ch??? c??i (a-z ho???c A-Z) v?? 1 s??? v?? c?? 1 k?? t??? ?????c bi???t"
      //   );
    } else if (password !== passwordComfirm) {
      setError("M???t kh???u kh??ng kh???p");
    } else if (cmttest.test(cmt) === false) {
      setError("Xin vui l??ng nh???p cmt h???p l???!");
    } else if (email === "") {
      setError("Xin vui l??ng nh???p email");
    } else if (phone === "") {
      setError("Xin vui l??ng nh???p s??? ??i???n tho???i");
    } else if (pass === "") {
      setError("Xin vui l??ng m???t kh???u");
    } else if (cmt === "") {
      setError("Xin vui l??ng nh???p cmt/cccd/cmnd");
    } else if (numberPlate === "") {
      setError("Xin vui l??ng nh???p bi???n s??? xe");
    } else if (weight === "") {
      setError("Xin vui l??ng nh???p tr???ng t???i xe");
      // } else if (addressCom === "") {
      //   setError("Xin vui l??ng nh???p ?????a ch??? c??ng ty");
      // } else if (licensePlates === "") {
      //   setError("Xin vui l??ng nh???p b???ng l??i xe");
    } else if (province === "") {
      setError("Xin vui l??ng ch???n T???nh");
    } else if (district === "") {
      setError("Xin vui l??ng ch???n Huy???n");
    } else if (ward === "") {
      setError("Xin vui l??ng ch???n X??");
    } else {
      setError("");
      const data = {
        idRole: 1,
        idWards: ward.id,
        name: name,
        numberPlate: numberPlate,
        address: address,
        phone: phone,
        status: 3, // ch??? duy???t
        passwordUser: "sdF1s6ikoq@",
        emailUser: email,
        cmtCode: cmt,
        weightCar: weight,
        idCompany: Cookies.get("id"),
        nameCompany: Cookies.get("name"),
      };

      await ShipperService.insert(data).then(async (res) => {
        if (res.data == -1) setError("????ng k?? th???t b???i. Email ???? ???????c ????ng k??");
        else if (res.data == 0) setError("????ng k?? th???t b???i. Vui l??ng th??? l???i");
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
                    console.log("???? qua ????y");
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
                    "????ng k?? t??i kho???n cho nh??n vi??n th??nh c??ng.<br> H??? th???ng s??? g???i th??ng b??o ?????n <b>" +
                      name +
                      "</b> th??ng qua  email:  <b>" +
                      email +
                      "</b>"
                  );
                  handleShow();
                  clear();
                } else {
                  setError("????ng k?? th???t b???i. Vui l??ng th??? l???i");
                }
              });
            console.log(res.data);
          } else {
            setMessage(
              "????ng k?? t??i kho???n cho nh??n vi??n th??nh c??ng.<br> H??? th???ng s??? g???i th??ng b??o ?????n <b>" +
                name +
                "</b> th??ng qua  email:  <b>" +
                email +
                "</b>"
            );
            handleShow();
            clear();
          }
        }
      });

      // await Authentication.registerCompany(data).then((res) => {
      //   if (res.data == -1) setError("Email ???? ???????c ????ng k??");
      //   else if (res.data == 0) setError("????ng k?? th???t b???i. Vui l??ng th??? l???i");
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
                  Th??m t??i x???
                </h3>
                <div className="profile-content">
                  <div className="profileimage2">
                    <i
                      className="bx bxs-user"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                    <div className="title edit-tt" style={{ padding: "10px" }}>
                      {"???nh ?????i di???n: "}
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
                            <label htmlFor="input">Ch???n ???nh</label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="profile-form">
                    <div className="form-group ">
                      <i className="bx bxs-buildings edit-tt"></i>
                      <div className="title edit-tt">{"T??n nh??n vi??n: "}</div>
                      <div className="i-cont">
                        <input
                          className="input"
                          type="text"
                          name="name"
                          id="name"
                          value={name}
                          placeholder="Nh???p T??n"
                          onChange={(e) => setName(e.target.value)}
                          onFocus={(e) => setError("")}
                        />
                      </div>
                    </div>
                    {/* <div className="form-group ">
                      <i className="bx bxs-key edit-tt"></i>
                      <div className="title edit-tt">{"M???t kh???u: "}</div>
                      <div className="i-cont">
                        <input
                          className="input"
                          type="password"
                          placeholder="M???t Kh???u"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <i className="bx bxs-key edit-tt"></i>
                      <div className="title edit-tt">
                        {"X??c nh???n m???t kh???u: "}
                      </div>
                      <div className="i-cont">
                        <input
                          className="input"
                          type="password"
                          placeholder="Nh???p l???i m???t Kh???u"
                          onChange={(e) => setPasswordComfirm(e.target.value)}
                        />
                      </div>
                    </div> */}
                    <div className="form-group">
                      <i className="bx bx-body edit-tt"></i>
                      <div className="title edit-tt">{"?????a ch???: "}</div>
                      <div className="i-cont">
                        <Select
                          placeholder="Ch???n t???nh/th??nh ph???"
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
                          placeholder="Ch???n huy???n/qu???n"
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
                          placeholder="Ch???n x??/ph?????ng"
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
                          placeholder="Nh???p t??n ???????ng/s??? nh??/h???m"
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
                          placeholder="Nh???p Email "
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={(e) => setError("")}
                        />
                      </div>
                    </div>
                    <div className="form-group form-button">
                      <i className="bx bx-phone edit-tt"></i>
                      <div className="title edit-tt">{"S??? ??i???n tho???i :"}</div>
                      <div className="i-cont">
                        <input
                          className="input"
                          type="tel"
                          value={phone}
                          placeholder="Nh???p S??? ??i???n tho???i "
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
                          placeholder="Nh???p s??? ch???ng minh th??/c??n c?????c c??ng d??n/ch???ng minh nh??n d??n"
                          onChange={(e) => setCmt(e.target.value)}
                          onFocus={(e) => setError("")}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <i className="bx bxs-truck edit-tt"></i>
                      <div className="title edit-tt">{"T???i tr???ng : "} </div>
                      <div className="i-cont">
                        <input
                          className="input"
                          type="number"
                          value={weight}
                          placeholder="Nh???p tr???ng t???i c???a xe"
                          onChange={(e) => setWeight(e.target.value)}
                          onFocus={(e) => setError("")}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <i className="bx bxs-truck edit-tt"></i>
                      <div className="title edit-tt">{"Bi???n s??? xe : "} </div>
                      <div className="i-cont">
                        <input
                          className="input"
                          type="text"
                          value={numberPlate}
                          placeholder="Nh???p bi???n s??? xe"
                          onChange={(e) => setNumberPlate(e.target.value)}
                          onFocus={(e) => setError("")}
                        />
                      </div>
                    </div>
                    {/* <div className="form-group">
                      <i className="bx bxs-location-plus edit-tt"></i>
                      <div className="title edit-tt">
                        {"?????a ch??? c??ng ty : "}{" "}
                      </div>
                      <div className="i-cont">
                        <input
                          className="input"
                          type="text"
                          placeholder="Nh???p ?????a ch??? c??ng ty"
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
                        Th??m nh??n vi??n
                      </button>
                      <button className="profile-button-cancel" onClick={clear}>
                        L??m m???i
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
            <Modal.Title>Th??ng b??o</Modal.Title>
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
