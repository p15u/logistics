import React, { useState, useEffect } from "react";
import { Button, Row, Col, Container, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, useHistory } from "react-router-dom";
import anhbia from "../../assets/images/anhbia.png";
import "./login.css";
import Authentication from "../../service/Service/Authentication";

import Cookies from "js-cookie";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isCheck, setCheck] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (props.history.location.state !== undefined) {
      if (props.history.location.state.mess === "reset") {
        setShowAlert(true);
      }
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      props.history.location.state.mess = "";
    }

    // console.log(mess);
  });

  const handleLogin = () => {
    let data = {
      emailUser: email,
      passwordUser: password,
    };
    console.log(data);
    console.log(isCheck);
    Authentication.login(data).then((res) => {
      console.log(res.data);
      if (res.data.idRole === 4 || res.data.idRole === 3) {
        Cookies.set("name", res.data.name, { expires: 30 });
        Cookies.set("id", res.data.idUser, { expires: 30 });
        Cookies.set("isLogged", true, { expires: 30 });
        Cookies.set("avatar", res.data.avatar, { expires: 30 });
        Cookies.set("role", res.data.idRole === 4 ? "__ad" : "__cp", {
          expires: 30,
        });

        history.push(
          res.data.idRole === 4 ? "/admin/dashboard" : "/company/dashboard"
        );
      } else {
        setError("Sai tên đăng nhập hoặc mật khẩu !");
      }
    });
  };
  const role = Cookies.get("role");
  let path = role === "__cp" ? "/company/dashboard" : "/admin/dashboard";
  const token = Cookies.get("isLogged");
  if (token) {
    // return <div className="header">Logistic</div>;
    return <Redirect to={path} />;
  } else {
    return (
      <Container className="mt-5">
        <div className="header">Logistic</div>
        <div className="header2">CHÀO MỪNG TRỞ LẠI</div>
        <Row>
          <Col className="col-header" lg={4} md={6} sm={12}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tài khoản</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Tài khoản"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Row></Row>

              <div className="text-left">
                <Form.Check
                  className="reset1 ml-2"
                  type="checkbox"
                  label="Nhớ mật khẩu"
                  onChange={(e) => {
                    setCheck(e.target.checked);
                  }}
                />
                <a className="linkforget" href="/forgetpass">
                  <small className="reset">Quên mật khẩu</small>
                </a>
              </div>
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={handleLogin}>
                  Đăng nhập
                </Button>
              </div>
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" href="/signupcompany">
                  Đăng ký
                </Button>
              </div>
              <div>
                <h6 className="err">{error}</h6>
              </div>

              {/* <hr className='hrtag' /> */}
            </Form>
            {/* <div className='loginBy'>
                            <div className='gg'>  <img className="google" src={google} alt="" /></div>
                            <div className='fb'>  <img className="fbo" src={facebook} alt="" /></div>
                        </div> */}
          </Col>
          <Col lg={8} md={6} sm={12}>
            <img className="imgBia" src={anhbia} alt="" />
          </Col>
        </Row>
        {showAlert && (
          <Alert
            className="alert-fail"
            variant="success"
            onAnimationEnd={() => setShowAlert(false)}
          >
            Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại
          </Alert>
        )}
      </Container>
    );
  }
};
export default Login;
