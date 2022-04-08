import React, { useState } from "react";
import { Button, Row, Col, Container, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import anhbia from "../../assets/images/anhbia.png";
import "./ResetPassword.css";
import Authentication from "../../service/Service/Authentication";

const ResetPassword = (props) => {
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const resetPass = async () => {
    if (password.length <= 8 || password.length >= 20) {
      setError("Mật khẩu nên nhiều hơn 8 và bé hơn 20 kí tự");
    } else if (password !== confirm) {
      setError("Mật khẩu không khớp. Vui lòng nhập lại");
    } else {
      await Authentication.getUpdatePass(
        props.location.state.idUser,
        password
      ).then((res) => {
        if (!res.data) setShowAlert(true);
        else
          props.history.push({
            pathname: "/login",
            state: {
              mess: "reset",
            },
          });
      });
    }
  };

  return (
    <Container className="mt-5">
      <div className="header">Logistic</div>
      <div className="header2">ĐỔI MẬT KHẨU</div>

      <Row>
        <Col className="col-header" lg={4} md={6} sm={12}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu mới"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Xác thực mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập xác thực"
                onChange={(e) => setConfirm(e.target.value)}
              />
            </Form.Group>
            <Row></Row>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" onClick={resetPass}>
                Đổi mật khẩu
              </Button>
            </div>
            <div>
              <h6 className="err">{error}</h6>
            </div>

            {/* <hr className='hrtag' /> */}
          </Form>
        </Col>
        <Col lg={8} md={6} sm={12}>
          <img className="imgBia" src={anhbia} alt="" />
        </Col>
      </Row>
      {showAlert && (
        <Alert className="alert-fail" variant="danger">
          Thay đổi mật khẩu thất bại. Vui lòng thử lại
        </Alert>
      )}
    </Container>
  );
};
export default ResetPassword;
