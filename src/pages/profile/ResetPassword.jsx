import React from "react";
import { Link } from "react-router-dom";
import "./profile.css";

const ResetPassword = () => {
  return (
    <div>
      <h2 className="page-header">Đổi Mật Khẩu</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <div className="profile-content">
                <div className="profile-form">
                  <div className="form-group">
                    <i className="bx bx-lock"></i>
                    <div className="title">{"Mật khẩu hiện tại: "}</div>
                    <div className="i-cont">
                      <input
                        className="password"
                        type="password"
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <i className="bx bxs-lock-alt"></i>
                    <div className="title">{"Mật khẩu mới: "}</div>
                    <div className="i-cont">
                      <input
                        className="password"
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <i className="bx bxs-lock-alt"></i>
                    <div className="title">{"Xác nhận mật khẩu mới: "} </div>
                    <div className="i-cont">
                      <input
                        className="password"
                        type="password"
                        placeholder="Nhập Xác nhận mật khẩu mới"
                      />
                    </div>
                  </div>

                  <div className="form-group form-button">
                    <button type="submit" className="profile-button">
                      Thay Đổi
                    </button>
                    <div className="profile-button-cancel">
                      <Link to={"/profile"} className="btn-cancel">
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

export default ResetPassword;
