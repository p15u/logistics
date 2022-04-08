import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import img from "../../assets/images/profile_canhan.JPG";
import NewsService from "../../service/Service/NewsService";
import "./news.css";

export default class NewsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idCom: 0,
      image: null,
      title: "",
      content: "",
      path: "",
      error: "",
    };
  }
  componentDidMount() {
    NewsService.getById(parseInt(this.props.match.params.id)).then(
      (response) => {
        this.setState({
          idCom: response.data.idCom,
          title: response.data.title,
          content: response.data.content,
          path: response.data.image,
        });
      }
    );
  }
  onFileChangeHandler = (e) => {
    console.log(this.props);
    e.preventDefault();
    this.setState({
      image: e.target.files[0],
      path: URL.createObjectURL(e.target.files[0]),
    });
  };
  onSubmit = (e) => {
    if (this.state.title == "" || this.state.content == "") {
      this.setState({
        error: "Vui lòng nhập đầy đủ!",
      });
    } else {
      this.setState({
        error: "",
      });
      const dataUpdate = {
        idCom: this.state.idCom,
        title: this.state.title,
        content: this.state.content,
      };
      NewsService.update(dataUpdate);
      e.preventDefault();
      if (this.state.image != null) {
        const formData = new FormData();
        formData.append("file", this.state.image);
        formData.append("id", parseInt(this.state.idCom));
        NewsService.updateImg(formData).then((res) => {
          if (res.data === 1) {
            alert("Cập nhật thành công!");
            this.props.history.push("/admin/news");
          }
        });
      } else {
        alert("Cập nhật thành công!");
        this.props.history.push("/admin/news");
      }
    }
  };

  render() {
    return (
      <div>
        <h2 className="page-header">Chỉnh Sửa Tin tức</h2>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card__body">
                <div className="news-content">
                  <div className="news-image">
                    <picture>
                      <img
                        className=" img-lg rounded-0"
                        width="100px"
                        height="100px"
                        src={
                          this.state.image instanceof File
                            ? URL.createObjectURL(this.state.image)
                            : `data:image/png;base64,${this.state.path}`
                        }
                        // src={this.state.path}
                        alt="customer"
                      />
                      <input
                        type="file"
                        name="image-upload"
                        accept="image/*"
                        id="input"
                        onChange={this.onFileChangeHandler}
                      />
                    </picture>
                    <div className="sidebar__item-inner ">
                      <i className="bx bx-image-add"></i>
                      <label htmlFor="input">Chọn hình</label>
                    </div>
                  </div>
                  <div className="news-form">
                    <div className="form-group">
                      <i className="bx bx-book-content edit-tt"></i>
                      <div className="edit-title edit-tt">{"Tiêu đề: "}</div>
                      <div className="i-cont">
                        <input
                          className="input"
                          type="text"
                          name="title"
                          id="title"
                          value={this.state.title}
                          onChange={(e) =>
                            this.setState({ title: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <i className="bx bx-receipt"></i>
                      <div className="edit-title">{"Nội dung: "}</div>
                      <div className="i-cont">
                        <textarea
                          className="input-Content"
                          type="text"
                          name="Content"
                          id="Content"
                          rows="4"
                          value={this.state.content}
                          onChange={(e) =>
                            this.setState({ content: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <label style={{ textAlign: "center", color: "red" }}>
                      {this.state.error}
                    </label>
                    <div className="form-group form-button">
                      <button
                        type="submit"
                        onClick={this.onSubmit}
                        className="news-button"
                      >
                        Cập nhật
                      </button>
                      <div className="news-button-cancel">
                        <Link to={"/admin/news"} className="btn-cancel">
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
  }
}
