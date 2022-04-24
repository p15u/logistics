import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import img from "../../assets/images/avatar.png";
import NewsService from "../../service/Service/NewsService";
import NotificationService from "../../service/Service/NotificationService";
import "./news.css";

import { Modal, Button, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
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
        error: "Vui lòng nhập đầy đủ thông tin!",
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
                this.handleShow();
              }
            });
          } else {
            this.handleShow();
          }
        } else {
          this.handleShow2();
        }
      });

      NewsService.getComercial().then((res) => {
        var temp = [];
        res.data.forEach((element) => {
          temp.push(element);
        });
        var lastObj = temp.slice(0, 1);
        const newsObj = {
          idCom: lastObj[0].idCom,
          content: this.state.content,
          title: this.state.title,
          image: "",
        };
        let tokenTemp = [];
        NotificationService.getAllTokenActive().then((response) => {
          this.setState({ ...this.state, token: response.data });
          console.log(this.state.token);
          this.state.token.map((token) => tokenTemp.push(token.token));
          console.log(tokenTemp);
          NotificationService.sendPushNotification(
            tokenTemp,
            this.state.title,
            this.state.content,
            "News",
            newsObj
          );
        });
      });
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
          {">"} Thêm mới
        </h4>
        <div
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {this.state.image && (
            <div>
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
            </div>
          )}

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
                Chọn ảnh
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
              Thêm
            </button>
          </div>
          <div className="news-button-cancel">
            <Link to={"/admin/news/"} className="btn-cancel">
              Hủy
            </Link>
          </div>
          <label
            style={{
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
              alignSelf: "center",
              marginLeft: 10,
            }}
          >
            {this.state.error}
          </label>
        </div>
        <div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body> Thêm mới thành công</Modal.Body>
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
    /**  <div>
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
      </div>*/
  }
}
