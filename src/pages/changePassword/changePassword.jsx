import React, { useState } from "react";
import "./changePassword.css";
import Authentication from "../../service/Service/Authentication";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { Button, Row, Col, Modal, Form, Alert } from "react-bootstrap";
const ChangePassword = (props) => {
  const [confirm, setConfirm] = useState("");
  const [oldpassword, setOldpassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [Suc, setSuc] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertSuc, setShowAlertSuc] = useState(false);
  const [show, setShow] = useState(false);
  let history = useHistory();
  const handleClose = () => {
    setShow(false);
    if (Cookies.get("role") == "__cp") history.push("/company/profile");
    else history.push("/admin/profile");
  };
  const handleShow = () => setShow(true);
  const changePass = async () => {
    const idUser = Cookies.get("id");
    if (password.length <= 8 || password.length >= 20) {
      setError("Mật khẩu lớn hơn 8 và bé hơn 20 kí tự !");
    } else if (password !== confirm) {
      setError("Mật khẩu không khớp. Vui lòng nhập lại !");
    } else if (password == oldpassword) {
      setError("Mật khẩu mới không được trùng với mật khẩu cũ.");
    } else {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      await Authentication.changePass(idUser, oldpassword, password).then(
        (res) => {
          console.log(res);
          if (res.data == -1) {
            setError("Mật khẩu không đúng. Vui lòng kiểm tra lại !");
          } else if (res.data == 0) {
            setError("Thay đổi mật khẩu thất bại. Vui lòng thử lại");
          } else {
            // setSuc("Thay đổi mật khẩu thành công !");
            handleShow();
            setError("");
          }
        }
      );
    }
  };

  return (
    <div className="row">
      <div className="col-12">
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
            {">"}Thay đổi mật khẩu
          </h5>
          <div className="userContainer">
            <div className="userShowLeft">
              <div className="userShowTop">
                <span className="userShowUserTitle">Các lưu ý : </span>
              </div>
              <span className="userShowUserTitle">
                - Mật khẩu bằng hoặc nhiều hơn 8 kí tự{" "}
              </span>
              <div className="userShowTop">
                <span className="userShowUserTitle">
                  - Mật khẩu bằng hoặc ít hơn 20 kí tự{" "}
                </span>
              </div>
              <div
                className="text-right"
                style={{
                  alignSelf: "flex-end",
                  alignContent: "right",
                  alignItems: "right",
                  textAlign: "right",

                  marginTop: "150px",
                  position: "relative",
                }}
              >
                <a
                  className="linkforget"
                  style={{
                    alignSelf: "flex-end",
                    alignContent: "right",
                    alignItems: "right",
                    textAlign: "right",
                  }}
                  href="/forgetpass"
                >
                  <small className="reset">Quên mật khẩu</small>
                </a>
              </div>
            </div>
            <div className="userShow">
              <Col className="" lg={4} md={6} sm={12}>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Nhập mật khẩu cũ"
                      onChange={(e) => setOldpassword(e.target.value)}
                      onFocus={(e) => setError("")}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={(e) => setError("")}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Xác thực mật khẩu</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Nhập xác thực"
                      onChange={(e) => setConfirm(e.target.value)}
                      onFocus={(e) => setError("")}
                    />
                  </Form.Group>
                  <Row></Row>

                  {/* <hr className='hrtag' /> */}
                </Form>
              </Col>
              <div>
                {
                  error && (
                    <Alert style={{ width: "400px" }} variant="danger">
                      {error}
                    </Alert>
                  )
                  // (success && <Alert severity="success">{success}</Alert>)
                }
              </div>
              {/* <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Mật khẩu cũ</label>
                  <input
                    type="password"
                    placeholder=". . . . . . . ."
                    className="userUpdateInput"
                    onChange={(e) => setOldpassword(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Mật khẩu mới</label>
                  <input
                    type="password"
                    placeholder=". . . . . . . ."
                    className="userUpdateInput"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    placeholder=". . . . . . . ."
                    className="userUpdateInput"
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>
                <div>
                  <h6 className="error">{error}</h6>
                  <h6 className="Suc">{Suc}</h6>
                </div>
              </div> */}
            </div>
          </div>
          <div className="userUpdateRight">
            <Button variant="primary" size="lg" onClick={changePass}>
              {" "}
              Xác Nhận
            </Button>
            {/* <button className="userUpdateButton" onClick={changePass}></button> */}
          </div>
          {showAlert && (
            <Alert className="alert-fail" variant="danger">
              Thay đổi mật khẩu thất bại. Vui lòng thử lại
            </Alert>
          )}
        </div>
        <div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>Thay đổi mật khẩu thành công</Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handleClose}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
