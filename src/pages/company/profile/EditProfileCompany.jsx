import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import ProfileApi from "../../../service/Service/profileService";
import Alert from "@material-ui/lab/Alert";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import "./profileCompany.css";
import { Col, Row, Modal, Button } from "react-bootstrap";
import CompanyService from "../../../service/Service/CompanyService";
import Authentication from "../../../service/Service/Authentication";

const EditProfileCompany = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [mst, setMst] = useState("");
  const [success, setSuccess] = useState("");
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWards, setListWards] = useState([]);
  const [province, setProvince] = useState({ id: 0, label: "" });
  const [district, setDistrict] = useState({ id: 0, label: "" });
  const [ward, setWard] = useState();
  const [show, setShow] = useState(false);
  const [giayphepKD, setGiayPhepKD] = useState("");
  const [checkAvatar, setCheckAvatar] = useState(false);
  const [checkGiayPhep, setCheckGiayPhep] = useState(false);

  let history = useHistory();
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

    CompanyService.getCompanyById(Cookies.get("id")).then(async (res) => {
      console.log(res.data);
      setProvince({
        id: res.data.idProvince,
        label: res.data.province,
      });
      setAddress(res.data.address);
      setPhone(res.data.phone);
      setDistrict({
        id: res.data.idDistrict,
        label: res.data.district,
      });
      setEmail(res.data.emailUser);
      setName(res.data.name);
      setMst(res.data.masothue);
      setImage(res.data.avatar);
      setGiayPhepKD(res.data.giayphepKD);
      setWard({
        id: res.data.idWards,
        label: res.data.wards,
      });
    });
  }, []);

  useEffect(() => {
    setDistrict("");
  }, [province]);

  useEffect(() => {
    setWard("");
  }, [district]);

  function imageHandler(e) {
    setError("");
    setCheckAvatar(true);
    setImage(e.target.files[0]);
  }
  function imageHandler2(e) {
    setError("");
    setCheckGiayPhep(true);
    setGiayPhepKD(e.target.files[0]);
  }

  const handleUpdate = async () => {
    const phoneNum =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const fullName =
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;

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
    } else if (mst.length != 10) {
      setError("Định dạng mã số thuế sai");
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
      await ProfileApi.update(data).then((res) => {
        if (res.data == 1) {
          if (checkGiayPhep) {
            setCheckGiayPhep(false);
            const formData = new FormData();
            formData.append("file", giayphepKD);
            formData.append("id", Cookies.get("id"));
            CompanyService.updateGiayPhep(formData).then((res) => {
              if (res.data === 1) {
                if (checkAvatar) {
                  setCheckAvatar(false);
                  const formData = new FormData();
                  formData.append("file", image);
                  formData.append("id", Cookies.get("id"));
                  Authentication.updateImg(formData).then((response) => {
                    if (response.data === 1) {
                      handleShow();
                    }
                  });
                } else {
                  handleShow();
                }
              } else {
                setError("Cập nhật thất bại. Vui lòng thử lại");
              }
            });
          } else {
            if (checkAvatar) {
              setCheckAvatar(false);
              const formData = new FormData();
              formData.append("file", image);
              formData.append("id", Cookies.get("id"));
              Authentication.updateImg(formData).then((response) => {
                if (response.data) {
                  handleShow();
                } else {
                  setError("Cập nhật thất bại. Vui lòng thử lại");
                }
              });
            } else {
              handleShow();
            }
          }
        } else {
          setError("Cập nhật thất bại. Vui lòng thử lại");
        }
      });
      setSuccess("Cập nhật thông tin thành công!");
    }
  };
  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: 30,

      paddingLeft: 20,
      borderWeight: 1,
      // borderColor: "black",
      borderRadius: 10,
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
  const handleClose = () => {
    setShow(false);
    history.push("/company/profile");
  };
  const handleShow = () => setShow(true);
  return (
    <div className="card">
      <h5 className="">
        <a
          style={{
            textDecoration: "none",
            color: `var(--text-color)`,
          }}
          href="/company/profile"
        >
          Thông tin cá nhân
        </a>
        {">"}Chỉnh sửa
      </h5>
      <Row>
        <Col sm={4}>
          <div style={{ marginTop: "20px" }}>
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
                  image instanceof File
                    ? URL.createObjectURL(image)
                    : `data:image/png;base64,${image}`
                }
                alt="customer"
              />
            </div>

            <div>
              <input
                type="file"
                name="image-upload"
                accept="image/jpeg,image/png"
                id="input"
                onChange={imageHandler}
              />

              <div
                style={{
                  alignItems: "center",
                  textAlign: "center",
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <b
                  style={{
                    alignContent: "center",
                    alignSelf: "center",
                    fontSize: 20,
                  }}
                >
                  <label htmlFor="input">
                    <i
                      style={{
                        fontSize: 30,
                        paddingTop: 10,
                        alignContent: "center",
                        alignSelf: "center",
                      }}
                      className="bx bx-image-add"
                    ></i>
                    Chọn ảnh
                  </label>
                </b>
              </div>
            </div>
          </div>
        </Col>
        <Col>
          <div style={{ alignItems: "left", alignSelf: "center" }}>
            <div className="form-group">
              <i class="bx bxs-user-pin"></i>
              <div className="labelName">{"Tên: "}</div>
              <div className="i-cont">
                <input
                  className="input"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nhập Tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={(e) => setError("")}
                />
              </div>
            </div>
            <div className="form-group">
              <i class="bx bx-envelope"></i>
              <div className="labelName">{"Email: "}</div>
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
            <div className="form-group ">
              <i class="bx bxs-phone-call"></i>
              <div className="labelName">{"Số điện thoại: "}</div>
              <div className="i-cont">
                <input
                  className="input"
                  type="tel"
                  name="tel"
                  id="tel"
                  placeholder="Nhập Số điện thoại "
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={(e) => setError("")}
                />
              </div>
            </div>
            <div className="form-group ">
              <i class="bx bxs-edit-location"></i>
              <div className="labelName">{"Địa chỉ: "}</div>
              <div className="i-cont">
                <Select
                  placeholder="Chọn tỉnh/thành phố"
                  value={province}
                  // value={listProvince.filter((option) => option.id === idP)}
                  styles={customStyles}
                  options={listProvince.map((item) => ({
                    ...item,
                    value: item.id,
                    label: item.name,
                  }))}
                  onChange={(province) => setProvince(province)}
                  onFocus={(e) => setError("")}
                />
                <Select
                  className="selectOption"
                  placeholder="Chọn huyện/quận"
                  value={district}
                  styles={customStyles}
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
                  placeholder="Chọn xã/phường"
                  value={ward}
                  styles={customStyles}
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
                  onFocus={(e) => setError("")}
                />
              </div>
            </div>
            <div className="form-group ">
              <i class="bx bx-money"></i>
              <div className="labelName">{"Mã số thuế: "}</div>
              <div className="i-cont">
                <input
                  className="input"
                  type="number"
                  name="tel"
                  id="tel"
                  placeholder="Mã số thuế "
                  value={mst}
                  onChange={(e) => setMst(e.target.value)}
                  onFocus={(e) => setError("")}
                />
              </div>
            </div>
            <div className="form-group ">
              <i class="bx bx-paperclip"></i>
              <div className="labelName">{"Giấy phép: "}</div>
              <div className="i-cont">
                <div>
                  <div style={{}}>
                    {giayphepKD && (
                      <img
                        style={{
                          resizeMode: "contain",
                          alignSelf: "center",
                          borderRadius: "10px",
                        }}
                        className=" img-sm "
                        // width="100px"
                        height="200px"
                        src={
                          giayphepKD instanceof File
                            ? URL.createObjectURL(giayphepKD)
                            : `data:image/png;base64,${giayphepKD}`
                        }
                        alt="customer"
                      />
                    )}
                  </div>

                  <div>
                    <input
                      type="file"
                      name="image-upload"
                      accept="image/jpeg,image/png"
                      id="inputGiayphep"
                      onFocus={(e) => setError("")}
                      onChange={imageHandler2}
                    />

                    <div>
                      <b>
                        <label htmlFor="inputGiayphep">
                          <i className="bx bx-image-add"></i>
                          Chọn ảnh
                        </label>
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group form-button">
              {
                error && <Alert severity="error">{error}</Alert>
                // (success && <Alert severity="success">{success}</Alert>)
              }
            </div>
            <div className="form-group form-button">
              <button className="profile-button" onClick={handleUpdate}>
                Cập nhật
              </button>
              <div
                className="news-button-cancel"
                style={{ marginLeft: "50px" }}
              >
                <Link to={"/company/profile"} className="btn-cancel">
                  Hủy
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
          </Modal.Header>
          <Modal.Body>Cập nhật thông tin thành công</Modal.Body>
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

export default EditProfileCompany;
