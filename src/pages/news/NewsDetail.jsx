import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/images/profile_canhan.JPG";
import "./news.css";
import NewsService from "../../service/Service/NewsService";

const NewsDetail = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    var id = props.match.params.id;

    NewsService.getById(parseInt(props.match.params.id)).then((response) => {
      setData(response.data);
    });
  }, [data]);
  return (
    <div className="card">
      <h5 className="page-header">
        <a
          style={{ textDecoration: "none", color: `var(--text-color)` }}
          href="/admin/news"
        >
          Tin tức
        </a>{" "}
        {">"} Chi tiết tin tức
      </h5>
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
          src={`data:image/png;base64,${data.image}`}
          alt="customer"
        />
      </div>

      <div className="form-group pt-3">
        <i className="bx bx-book-content"></i>
        <div className="title">{"Tiêu đề: "}</div>
        <div className="i-cont">
          <b>{data.title}</b>
        </div>
      </div>
      <div className="form-group">
        <i className="bx bx-receipt"></i>
        <div className="titlenew">{"Nội dung: "}</div>
        <div style={{ textAlign: "justify", width: "70%" }} className="icont2">
          {data.content}
        </div>
      </div>
      <div className="form-group form-button">
        <div className="news-button">
          <Link to={"/admin/newsupdate/" + data.idCom} className="btn">
            Chỉnh sửa
          </Link>
        </div>
        <div className="news-button-cancel">
          <Link to={"/admin/news"} className="btn-cancel">
            Hủy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
