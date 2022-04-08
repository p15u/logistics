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

const ShipperUpdate = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <h2 className="page-header">Cập Nhật Thông Tin Doanh Nghiệp</h2>
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
                    src="https://photo-cms-bizlive.zadn.vn/670x350/uploaded/huyencham_pv/2020_11_27/futaex_gcko.jpg"
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
                    <label>Tên</label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn Tân"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder="nguyenvantan@gmail.com"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      placeholder="0948123456"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Địa chỉ</label>
                    <input
                      type="text"
                      placeholder="65A,Quốc Lộ 1A, Cái Răng, Cần Thơ"
                      className="userUpdateInput"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="userShow">
              <form className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>ID Công TY</label>
                    <input
                      type="text"
                      placeholder="CT0016"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>cmtCode</label>
                    <input
                      type="text"
                      placeholder="654824"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Tải Trọng</label>
                    <input
                      type="text"
                      placeholder="500"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Giấy Phép</label>
                    <input
                      type="text"
                      placeholder="Đã Kiểm Duyệt"
                      className="userUpdateInput"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="userUpdateRight">
            <button className="userUpdateButton">Xác Nhận</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipperUpdate;
