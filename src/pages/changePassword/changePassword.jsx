import React, { useState } from "react";
import "./changePassword.css";
import Authentication from "../../service/Service/Authentication";
import Cookies from "js-cookie";
import { Alert } from "react-bootstrap";

const ChangePassword = (props) => {
  const [confirm, setConfirm] = useState("");
  const [oldpassword, setOldpassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [Suc, setSuc] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertSuc, setShowAlertSuc] = useState(false);

  const changePass = async () => {
    const idUser = Cookies.get("id");
    if (password.length <= 8 || password.length >= 20) {
      setError("Mật khẩu lớn hơn 8 và bé hơn 20 kí tự !");
    } else if (password !== confirm) {
      setError("Mật khẩu không khớp. Vui lòng nhập lại !");
    } else {
      await Authentication.changePass(idUser, oldpassword, password).then(
        (res) => {
          if (!res.data) {
            setError("Mật khẩu không đúng. Vui lòng kiểm tra lại !");
          } else {
            setSuc("Thay đổi mật khẩu thành công !");
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
          <h2 className="page-header">Thay đổi mật khẩu</h2>
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
            </div>
            <div className="userShow">
              <div className="userUpdateLeft">
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
              </div>
            </div>
          </div>
          <div className="userUpdateRight">
            <button className="userUpdateButton" onClick={changePass}>
              Xác Nhận
            </button>
          </div>
          {showAlert && (
            <Alert className="alert-fail" variant="danger">
              Thay đổi mật khẩu thất bại. Vui lòng thử lại
            </Alert>
          )}
          {showAlertSuc && (
            <Alert className="alert-fail" variant="success">
              Thay đổi mật khẩu thành công !
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
