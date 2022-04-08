import React, { useState } from "react";
import { Button, Container, Col, Form, Row } from "react-bootstrap";
import anhbiasignup from "../../assets/images/anhbia.png";

import "bootstrap/dist/css/bootstrap.min.css";
//import blue from "../assets/images/blue.png";
//import BlueOther from "../assets/images/orderblue.png";
import "./SignUp.css";

import Alert from "@material-ui/lab/Alert";

//import CompanyApi from "../service/Service/Authentication";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tax, setTax] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordComfirm, setPasswordComfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    const re =
      /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    const pass = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,50}$/;
    const phoneNum =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if ((email || name || tax || phone || password || passwordComfirm) === "") {
      setError("Vui lòng không để chống");
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
    } else if (password !== passwordComfirm) {
      setError("Mật khẩu không khớp");
    }
    const data = {
      name: name,
      emailUser: email,
      phone: phone,
      masothue: tax,
      passwordUser: password,
      status: 1,
      idRole: 2,
      idWards: 4,
    };
    console.log(data);
    //await CompanyApi.registerCompany(data);
    console.log("regiss nek");
  };
  return (
    <>
      <div className="header">Đăng ký - Logistics</div>
      <Row>
        <Container className="col-md-3 mx-auto">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicAccout">
              {error && <Alert severity="error">{error}</Alert>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAccout">
              <Form.Control
                type="text"
                placeholder="Tên công ty"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Mã số thuế"
                onChange={(e) => setTax(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="number"
                placeholder="Số điện thoại"
                onChange={(e) => setPhone(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Xác nhận mật khẩu"
                onChange={(e) => setPasswordComfirm(e.target.value)}
              />
            </Form.Group>
            <div className="text-left">
              <Form.Check
                className="reset1 ml-2"
                type="checkbox"
                label="Nhớ mật khẩu"
              />
            </div>
            <Button
              className="primary"
              variant="primary"
              size="lg"
              onClick={handleRegister}
            >
              Đăng ký
            </Button>
            {/* <hr className='hrtag' /> */}
          </Form>
        </Container>
        <Col lg={6} md={6} sm={12}>
          <img className="imgBia" alt="" src={anhbiasignup} />
        </Col>
      </Row>
      {/* <img className="nav-blue" src={BlueOther} alt="" />
      <img className="nav-last" src={blue} alt="" /> */}
    </>
  );
};

export default SignUp;
