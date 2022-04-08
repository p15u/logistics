import React from "react";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import "./css_pages/user.css";

const CustomerUpdate = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <h2 className="page-header">Cập Nhật Thông Tin Khách Hàng</h2>
          <div className="userContainer">
            <div className="userShowLeft">
              <div className="userShowTop">
                <div className="userShowTopTitle">
                  <span className="userShowUserTitle">Ảnh đại diện</span>
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
              </div>
            </div>
            <div className="userShow">
              <form className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Họ Tên</label>
                    <input
                      type="text"
                      placeholder="Anna Becker"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder="annabeck99@gmail.com"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      placeholder="+1 123 456 67"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Địa chỉ</label>
                    <input
                      type="text"
                      placeholder="New York | USA"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateRight">
                    <button className="userUpdateButton">Xác Nhận</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerUpdate;
