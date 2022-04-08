import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import img from "../../assets/images/avatar.png";
import NewsService from "../../service/Service/NewsService";
import "./news.css";

export default class AddNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idCom: 0,
      image: null,
      title: "",
      content: "",
      path: img,
      error: "",
    };
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
        title: this.state.title,
        content: this.state.content,
      };
      NewsService.insert(dataUpdate).then((res) => {
        e.preventDefault();
        if (res.data === 1) {
          if (this.state.image != null) {
            const formData = new FormData();
            formData.append("file", this.state.image);
            NewsService.insertImg(formData).then((res) => {
              if (res.data === 1) {
                alert("Thêm thành công!");
                this.props.history.push("/admin/news");
              }
            });
          } else {
            alert("Thêm thành công!");
            this.props.history.push("/admin/news");
          }
        } else {
          alert("Thêm thất bại!");
        }
      });
    }
  };

  render() {
    return (
      <div>
        <h2 className="page-header">Thêm Tin tức</h2>
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
                        src={this.state.path}
                        alt="customer"
                      />
                      <input
                        type="file"
                        name="image-upload"
                        accept="image/jpeg,image/png"
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
                      <i className="bx bx-book-content"></i>
                      <div className="title">{"Tiêu đề: "}</div>
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
                      <div className="title">{"Nội dung: "}</div>
                      <div className="i-cont">
                        <textarea
                          className="input"
                          type="text"
                          name="Content"
                          id="Content"
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
                        Thêm
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
