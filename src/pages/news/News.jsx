import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Table from "../../components/table/Table";
import { Modal, Button, Form, Alert, Row, Col } from "react-bootstrap";
import ShipperList from "../../assets/JsonData/news-list.json";
import NewsService from "../../service/Service/NewsService";

import add from "../../assets/images/add.png";
import "./news.css";

const News = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [id, setId] = useState(0);
  useEffect(() => {
    NewsService.getNews().then((response) => {
      setData(response.data);
    });
  }, [data]);
  const deleteProduct = () => {
    handleClose();

    NewsService.delete(id).then((res) => {
      if (res.data == 1) {
        handleShow2();
      }
    });
  };
  const handleShow = (id) => {
    setShow(true);
    setId(id);
  };
  const handleClose = () => setShow(false);
  const handleShow2 = () => {
    setShow2(true);
  };
  const handleClose2 = () => setShow2(false);
  return (
    <div>
      <div className="row">
        <div className="card">
          <div className="card__body">
            <div className="">
              <div>
                <Row className="page-header">
                  <Col>
                    <h5>Tin Tức</h5>
                  </Col>
                  <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Link to={"/admin/addNews"}>
                      <img
                        className=" img-lg rounded-0"
                        width="30px"
                        height="30px"
                        src={add}
                        alt="customer"
                      />
                    </Link>
                  </Col>
                </Row>
              </div>
              <table style={{ height: "550px", width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>Mã số</th>

                    <th style={{ width: "250px" }}>Tiêu đề</th>
                    <th style={{ width: "45%" }}>Nội dung</th>
                    <th style={{ width: "200px" }}>Hình đại diện</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody style={{ maxHeight: "590px" }}>
                  {data.map((item) => (
                    <tr key={item.idCom}>
                      <td style={{ width: "60px" }}>{item.idCom}</td>
                      <td style={{ width: "250px" }}>{item.title}</td>
                      <td style={{ width: "45%", textAlign: "justify" }}>
                        {item.content.length >= 200 ? (
                          <div>
                            {`${item.content.substring(0, 200)}...`}
                            <Link to={"/admin/newsdetail/" + item.idCom}>
                              Xem thêm
                            </Link>
                          </div>
                        ) : (
                          <div> {item.content}</div>
                        )}
                      </td>
                      <td style={{ width: "220px" }}>
                        <img
                          className=" img-lg rounded-0"
                          width="200px"
                          // height="100px"
                          src={`data:image/png;base64,${item.image}`}
                          alt="customer"
                        />
                      </td>
                      <td style={{ alignContent: "center" }}>
                        <div className="item-show">
                          <Link to={"/admin/newsdetail/" + item.idCom}>
                            <i className="bx bx-show"></i>
                          </Link>
                        </div>
                      </td>
                      <td style={{ alignContent: "center" }}>
                        <div className="item-edit">
                          <Link to={"/admin/newsupdate/" + item.idCom}>
                            <i className="bx bx-edit-alt"></i>
                          </Link>
                        </div>
                      </td>
                      <td style={{ alignContent: "center" }}>
                        <Link>
                          <div
                            className="item-delete"
                            onClick={() => handleShow(item.idCom)}
                          >
                            <i
                              style={{ color: "red" }}
                              className="bx bx-trash"
                            ></i>
                          </div>
                        </Link>
                      </td>

                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cảnh báo</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có muốn xóa không!</Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={handleClose}>
              Không
            </Button>
            <Button className="danger" variant="danger" onClick={deleteProduct}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
          </Modal.Header>
          <Modal.Body>Xóa thành công!</Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={handleClose2}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default News;
