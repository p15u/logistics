import React, { useState, useEffect } from "react";
import { Button, Container, Col, Form, Row } from "react-bootstrap";
import anhbiasignup from "../../assets/images/anhbia.png";

import ProfileApi from "../../service/Service/profileService";
import "bootstrap/dist/css/bootstrap.min.css";
//import blue from "../assets/images/blue.png";
//import BlueOther from "../assets/images/orderblue.png";
import "./SignUp.css";
import Select from "react-select";

import Alert from "@material-ui/lab/Alert";
import Authentication from "../../service/Service/Authentication";

//import CompanyApi from "../service/Service/Authentication";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tax, setTax] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gpkd, setGpkd] = useState("");
  const [passwordComfirm, setPasswordComfirm] = useState("");
  const [error, setError] = useState("");

  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWards, setListWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
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
  const handleRegister = async (e) => {
    const re =
      /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    const pass = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,50}$/;
    const phoneNum =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (
      (email || name || tax || phone || password || passwordComfirm || gpkd) ===
      ""
    ) {
      setError("Vui lòng không để trống");
    } else if (email === "") {
      setError("Vui lòng nhập Email");
    } else if (name === "") {
      setError("Xin vui lòng nhập tên");
    } else if (tax === "") {
      setError("Xin vui lòng nhập Mã Số Thuế");
    } else if (phone === "") {
      setError("Xin vui lòng nhập Số Điện Thoại");
    } else if (phoneNum.test(phone) === false) {
      setError("Định dạng số điện thoại sai");
    } else if (password === "") {
      setError("Xin vui lòng nhập mật khẩu");
    } else if (passwordComfirm === "") {
      setError("Xin vui lòng nhập mật khẩu Xác Thực");
      // } else if (gpkd === "") {
      //   setError("Xin vui lòng nhập giấy phép kinh doanh");
    } else if (email.length > 100) {
      setError("Email phải đảm bảo: độ dài không quá 100 ký tự");
    } else if (re.test(email) === false) {
      setError("Định dạng sai Emai! - ví dụ: nguyenvana@gmail.com");
    } else if (pass.test(password) === false) {
      setError(
        "Mật khẩu phải: dài 8-50 ký tự, có ít nhất 1 chữ cái (a-z hoặc A-Z) và 1 số và có 1 ký tự đặc biệt"
      );
    } else if (pass.test(passwordComfirm) === false) {
      setError(
        "Xác nhận Mật khẩu phải: dài 8-50 ký tự, có ít nhất 1 chữ cái (a-z hoặc A-Z) và 1 số và có 1 ký tự đặc biệt"
      );
    } else if (password != passwordComfirm) {
      setError("Mật khẩu không khớp");
    } else {
      const data = {
        name: name,
        emailUser: email,
        phone: phone,
        masothue: tax,
        passwordUser: password,
        status: 1,
        idRole: 3,
        idWards: ward.id,
        address: address,
      };
      console.log(data);
      await Authentication.registerCompany(data).then((res) => {
        if (res.data == -1) setError("Email đã được đăng ký");
        else if (res.data == 0) setError("Đăng ký thất bại. Vui lòng thử lại");
        else
          props.history.push({
            pathname: "/login",
            state: {
              mess: "regis",
            },
          });
      });
    }
  };
  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: 30,

      borderWeight: 1,
      borderColor: "black",
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
  return (
    <div style={{ width: "100%" }}>
      <div className="header">Đăng ký doanh nghiệp</div>
      <Row>
        <Form
          style={{
            width: 300,
            marginTop: 150,
            marginLeft: 60,
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicAccout">
            <Form.Control
              type="text"
              placeholder="Tên công ty"
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => setError("")}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => setError("")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="number"
              placeholder="Số điện thoại"
              onChange={(e) => setPhone(e.target.value)}
              onFocus={(e) => setError("")}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => setError("")}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Xác nhận mật khẩu"
              onChange={(e) => setPasswordComfirm(e.target.value)}
              onFocus={(e) => setError("")}
            />
          </Form.Group>
          {/* <div row>
            <Button style={{ backgroundColor: "#809fff" }}>Ảnh đại diện</Button>
          </div> */}
        </Form>
        <Form
          style={{
            width: 350,
            // marginTop: 150,
            // marginLeft: 60,
          }}
        >
          <Container className="col" style={{ marginTop: 150 }}>
            <Form.Group className="mb-3" style={{ width: 278 }}>
              <Select
                className="mb-2 "
                placeholder="Chọn tỉnh/thành phố"
                value={province}
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
                className="selectOption mb-1"
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
                onFocus={(e) => setError("")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Địa chỉ"
                onChange={(e) => setAddress(e.target.value)}
                onFocus={(e) => setError("")}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Mã số thuế"
                onChange={(e) => setTax(e.target.value)}
                onFocus={(e) => setError("")}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            {/* <Form.Group controlId="formFile" className="mb-3">
              <Form.Text> Giấy phép kinh doanh</Form.Text>
              <Form.Control type="file" label="Giấy phép kinh doanh" />
            </Form.Group> */}
          </Container>
        </Form>
        {/* <Col> */}

        {/* </Col> */}
      </Row>
      <img className="imgBia" alt="" src={anhbiasignup} />
      <div style={{ marginLeft: 70, width: 600 }}>
        <Form.Group controlId="formBasicAccout" className="col">
          {error && <Alert severity="error">{error}</Alert>}
        </Form.Group>
      </div>

      <Button
        style={{ marginTop: 10, marginLeft: 135, width: 400 }}
        className="primary"
        variant="primary"
        size="lg"
        onClick={handleRegister}
      >
        Đăng ký
      </Button>
      <Button
        style={{
          // backgroundColor: "#255464",
          marginTop: 70,
          marginLeft: 135,
          width: 400,
        }}
        className="primary"
        variant="primary"
        size="lg"
        href="/login"
      >
        Đăng nhập
      </Button>

      {/* <img className="nav-blue" src={BlueOther} alt="" />
      <img className="nav-last" src={blue} alt="" /> */}
    </div>
  );
};

export default SignUp;
