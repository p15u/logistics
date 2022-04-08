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

const CompanyUpdate = () => {
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
                    src="https://i.doanhnhansaigon.vn/2021/02/09/Viettel-post-2-7764-1612841153.jpg"
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
                      placeholder="Viettel Post"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder="viettelpostct@gmail.com"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      placeholder="1900 8095"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Địa chỉ</label>
                    <input
                      type="text"
                      placeholder="62b, Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ"
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
                    <label>Mã Số Thuế</label>
                    <input
                      type="text"
                      placeholder="186456"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Giấy Phép Kinh Doanh</label>
                    <input
                      type="text"
                      placeholder="36469875"
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

export default CompanyUpdate;
