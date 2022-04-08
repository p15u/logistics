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
    <div>
      <h2 className="page-header">Chi Tiết Tin Tức</h2>
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
                      src={`data:image/png;base64,${data.image}`}
                      alt="customer"
                    />
                  </picture>
                </div>
                <div className="news-form">
                  <div className="form-group">
                    <i className="bx bx-book-content"></i>
                    <div className="title">{"Tiêu đề: "}</div>
                    <div className="i-cont">{data.title}</div>
                  </div>
                  <div className="form-group">
                    <i className="bx bx-receipt"></i>
                    <div className="title">{"Nội dung: "}</div>
                    <div className="i-cont">{data.content}</div>
                  </div>
                  <div className="form-group form-button">
                    <div className="news-button">
                      <Link
                        to={"/admin/newsupdate/" + data.idCom}
                        className="btn"
                      >
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
