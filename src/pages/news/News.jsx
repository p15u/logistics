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
  const [id, setId] = useState(0);
  useEffect(() => {
    NewsService.getNews().then((response) => {
      setData(response.data);
    });
  }, [data]);
  const deleteProduct = () => {
    handleClose();
    NewsService.delete(id).then((res) => {
      alert("Delete product successfully.");
    });
  };
  const handleShow = (id) => {
    setShow(true);
    setId(id);
  };
  const handleClose = () => setShow(false);
  return (
    <div>
      <div>
        <Row className="page-header">
          <Col>
            <h2>Tin Tức</h2>
          </Col>
          <Col style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to={"/admin/addNews"}>
              <img
                className=" img-lg rounded-0"
                width="50px"
                height="50px"
                src={add}
                alt="customer"
              />
            </Link>
          </Col>
        </Row>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <th>Mã số</th>

                    <th>Tiêu đề</th>
                    <th>Nội dung</th>
                    <th>Hình đại diện</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.idCom}>
                      <td>{item.idCom}</td>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                      <td>
                        <img
                          className=" img-lg rounded-0"
                          width="100px"
                          height="100px"
                          src={`data:image/png;base64,${item.image}`}
                          alt="customer"
                        />
                      </td>
                      <td>
                        <div className="item-show">
                          <Link to={"/admin/newsdetail/" + item.idCom}>
                            <i className="bx bx-show"></i>
                          </Link>
                        </div>
                      </td>
                      <td>
                        <div className="item-edit">
                          <Link to={"/admin/newsupdate/" + item.idCom}>
                            <i className="bx bx-edit-alt"></i>
                          </Link>
                        </div>
                      </td>
                      <td>
                        <Link>
                          <div
                            className="item-delete"
                            onClick={() => handleShow(item.idCom)}
                          >
                            <i className="bx bx-trash"></i>
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
            <Button className="badge badge-secondary" onClick={handleClose}>
              Không
            </Button>
            <Button className="badge badge-success" onClick={deleteProduct}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default News;
