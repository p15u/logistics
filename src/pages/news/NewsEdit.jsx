import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import img from "../../assets/images/profile_canhan.JPG";
import NewsService from "../../service/Service/NewsService";
import "./news.css";

import { Modal, Button, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
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
      show: false,
      show2: false,
    };
  }
  handleClose = () => {
    this.setState({ ...this.state, show: false });
    this.props.history.push("/admin/news");
  };
  handleShow = () => this.setState({ ...this.state, show: true });
  handleClose2 = () => this.setState({ ...this.state, show2: false });
  handleShow2 = () => this.setState({ ...this.state, show2: true });
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
            this.handleShow();
          }
        });
      } else {
        this.handleShow();
      }
    }
  };

  render() {
    return (
      <div className="card">
        <h4 className="page-header">
          <a
            style={{ textDecoration: "none", color: `var(--text-color)` }}
            href="/admin/news"
          >
            Tin tức
          </a>
          {">"}{" "}
          <a
            style={{ textDecoration: "none", color: `var(--text-color)` }}
            href="/admin/newsdetails"
          >
            Chi tiết tin tức
          </a>
          {">"} Cập nhật
        </h4>
        <div
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            style={{ resizeMode: "contain", alignSelf: "center" }}
            className=" img-lg rounded-0"
            // width="100px"
            height="400px"
            src={
              this.state.image instanceof File
                ? URL.createObjectURL(this.state.image)
                : `data:image/png;base64,${this.state.path}`
            }
            // src={this.state.path}
            alt="customer"
          />
          <div style={{ resizeMode: "contain", alignSelf: "center" }}>
            <input
              style={{ resizeMode: "contain", alignSelf: "center" }}
              type="file"
              name="image-upload"
              accept="image/*"
              id="input"
              onChange={this.onFileChangeHandler}
            />

            <div
              style={{
                resizeMode: "contain",
                alignSelf: "center",
                marginTop: 10,
              }}
            >
              <i
                className="bx bx-image-add"
                style={{ fontWeight: "bold", fontSize: 20 }}
              ></i>
              <label
                htmlFor="input"
                style={{ fontWeight: "bold", fontSize: 18 }}
              >
                Chọn ảnh khác
              </label>
            </div>
          </div>
        </div>
        <div className="form-group pt-3">
          <i
            style={{
              alignSelf: "center",
            }}
            className="bx bx-book-content"
          ></i>
          <div
            style={{
              alignSelf: "center",
              color: "var(--text-color)",
            }}
            className="title"
          >
            {"Tiêu đề: "}
          </div>
          <div className="i-cont" style={{ width: "70%" }}>
            <input
              className="input"
              type="text"
              name="title"
              id="title"
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
            />
            {/* <b>{this.state.title}</b> */}
          </div>
        </div>
        <div className="form-group">
          <i className="bx bx-receipt"></i>
          <div className="titlenew">{"Nội dung: "}</div>
          <div
            style={{ textAlign: "justify", width: "70%" }}
            className="icont2"
          >
            <textarea
              className="input-Content"
              type="text"
              name="Content"
              id="Content"
              rows="5"
              value={this.state.content}
              onChange={(e) => this.setState({ content: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group form-button">
          <div className="news-button">
            <button
              style={{ padding: 0 }}
              type="submit"
              onClick={this.onSubmit}
              className="news-button"
            >
              Chỉnh sửa
            </button>
          </div>
          <div className="news-button-cancel">
            <Link
              to={"/admin/newsdetail/" + this.state.idCom}
              className="btn-cancel"
            >
              Hủy
            </Link>
          </div>
          <label style={{ textAlign: "center", color: "red" }}>
            {this.state.error}
          </label>
        </div>{" "}
        <div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body> Cập nhật thành công</Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={this.handleClose}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div>
          <Modal show={this.state.show2} onHide={this.handleClose2}>
            <Modal.Header closeButton>
              <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body> Thêm mới thất bại. Vui lòng thử lại</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.handleClose2}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
