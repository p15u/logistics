import React, { useState, useEffect, PureComponent } from "react";
import CompanyService from "../service/Service/CompanyService";
import CustomerService from "../service/Service/CustomerService";
import { Row, Col } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter,
  numberFilter,
} from "react-bootstrap-table2-filter";
import active from "../assets/images/active.png";
import inactive from "../assets/images/inactive.jpg";
import waiticon from "../assets/images/wait.png";
import off from "../assets/images/off.png";
import paginationFactory from "react-bootstrap-table2-paginator";

export class Company extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 10,
      currentPage: 0,
      data: [],
      value: "",
      tableFilter: [],
      dataTemp: [],
    };
  }

  componentDidMount() {
    // setInterval(() => {
    this.getData();
    // }, 100);
  }

  //Lấy Dữ Liệu
  getData() {
    CompanyService.getCompany().then((res) => {
      var data = res.data;
      var slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgtableData: res.data,
        tableData: slice,
        dataTemp: res.data,
        tableFilter: res.data,
      });
    });
  }
  getStatus(stt) {
    if (stt == 0) {
      return (
        <div>
          <p>
            <img
              height={15}
              width={15}
              style={{ marginRight: 5, marginLeft: 20 }}
              src={inactive}
              alt="inactive"
            />
            Ngưng hoạt động
          </p>
        </div>
      );
    } else if (stt == 1) {
      return (
        <div>
          <p>
            <img
              height={15}
              width={15}
              style={{ marginRight: 5, marginLeft: 20 }}
              src={active}
              alt="active"
            />
            Đang hoạt động
          </p>
        </div>
      );
    } else if (stt == 2) {
      return (
        <div>
          <p>
            <img
              height={15}
              width={15}
              style={{ marginRight: 5, marginLeft: 20 }}
              src={off}
              alt="inactive"
            />
            Đang tắt
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p>
            <img
              height={15}
              width={15}
              style={{ marginRight: 5, marginLeft: 20 }}
              src={waiticon}
              alt="wait"
            />
            Đang chờ duyệt
          </p>
        </div>
      );
    }
  }
  //Cập nhật trạng thái
  updateStatus = (item) => {
    if (item.status === 0) {
      item.status = 1;
    } else {
      item.status = 0;
    }
    CustomerService.updateStatus(item);
    //axios.post(`${HOST}/user/changeStatus`, item);
  };
  routeChange(item) {
    let path = `/admin/companydetail`;

    this.props.history.push({
      pathname: path,
      state: { data: item.idUser },
    });
  }
  filterData = (e) => {
    if (e.target.value != "") {
      this.setState({ value: e.target.value });
      const filterTable = this.state.tableData.filter((o) =>
        o.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      this.setState({ tableFilter: [...filterTable] });
    } else {
      this.setState({ value: e.target.value });
      this.setState({ tableFilter: [...this.state.tableData] });
    }
  };
  render() {
    const options = {
      // pageStartIndex: 0,
      sizePerPage: 10,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true,
    };
    const selectOptionsArr = [
      {
        value: 0,
        label: "Ngưng hoạt động",
      },
      {
        value: 1,
        label: "Đang hoạt động",
      },
      {
        value: 2,
        label: "Đang tắt",
      },
      {
        value: 3,
        label: "Đang chờ duyệt",
      },
    ];
    const tableRowEvents = {
      onClick: (e, row, rowIndex) => {
        let path = `/admin/companydetail`;

        this.props.history.push({
          pathname: path,
          state: { data: row.idUser },
        });
      },
      onMouseEnter: (e, row, rowIndex) => {
        console.log(`enter on row with index: ${rowIndex}`);
      },
    };

    const columns = [
      {
        dataField: "idUser",
        text: "Mã số",
        sort: true,
        headerStyle: (colum, colIndex) => {
          return {
            width: "80px",
          };
        },

        style: {
          width: "80px",
        },
      },
      {
        dataField: "name",
        text: "Tên",
        sort: true,
        style: {
          width: "230px",
        },
        filter: textFilter({
          style: {
            height: "35px",
            borderRadius: "10px",
            borderWidth: "1px",
            width: "200px",
          },
          placeholder: "Nhập tên...",
          onClick: (e) => console.log(e),
        }),
        headerStyle: (colum, colIndex) => {
          return { width: "230px", textAlign: "center" };
        },
      },
      {
        dataField: "phone",
        text: "SDT",
        style: {
          width: "170px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "170px", textAlign: "center" };
        },
      },
      {
        dataField: "emailUser",
        text: "Email",
        style: {
          width: "230px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "230px", textAlign: "center" };
        },
      },
      {
        dataField: "address",
        text: "Địa chỉ \n",
        align: "left",
        style: {
          width: "220px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "220px", textAlign: "center" };
        },
        formatter: (cell, row, rowIndex, extraData) => (
          <div>
            {row.address +
              ", " +
              row.wards +
              ", " +
              row.district +
              ", " +
              row.province}
          </div>
        ),
        filter: textFilter({
          style: {
            height: "35px",
            borderRadius: "10px",
            borderWidth: "1px",
            width: "190px",
          },
          placeholder: "Nhập địa chỉ...",
          onClick: (e) => console.log(e),
        }),
      },

      {
        dataField: "status",
        text: "Trạng thái",
        style: {
          width: "230px",
          paddingLeft: "30px",
        },
        align: "left",

        headerStyle: (colum, colIndex) => {
          return { width: "220px", textAlign: "center" };
        },
        filter: selectFilter({
          options: () => selectOptionsArr,
          style: {
            height: "35px",
            borderRadius: "10px",
            borderWidth: "1px",
            width: "160px",
          },

          placeholder: "Chọn trạng thái",
          className: "test-classname",
          datamycustomattr: "datamycustomattr",
        }),

        formatter: (cell, row, rowIndex, extraData) => (
          <div>
            {this.getStatus(row.status)}
            {/* {row.status === 0 ? (
              <div>
                <p>
                  Ngưng hoạt động
                  <img
                    height={20}
                    width={20}
                    style={{ marginLeft: 5 }}
                    src={inactive}
                    alt="inactive"
                  />
                </p>
              </div>
            ) : (
              <div>
                <p>
                  Hoạt động
                  <img
                    height={20}
                    width={20}
                    style={{ marginLeft: 5 }}
                    src={active}
                    alt="active"
                  />
                </p>
              </div>
            )} */}
          </div>
        ),
      },
    ];
    return (
      <div className="row">
        <div className="card">
          <div className="card__body">
            <Row>
              <Col>
                <h5>Danh sách doanh nghiệp </h5>
              </Col>
            </Row>
            <div
              style={{
                position: "relative",
                // marginLeft: "10px",
                // height: "565px",
                width: "100%",
                // overflow: "scroll",
                // marginBottom: "10px",
              }}
            >
              <BootstrapTable
                keyField="idUser"
                data={this.state.tableData}
                columns={columns}
                rowEvents={tableRowEvents}
                filter={filterFactory()}
                defaultPageSize={20}
                pagination={paginationFactory(options)}
                bordered={false}
              />
            </div>
          </div>
        </div>
      </div>
      // </div>
    );
  }
  // render() {
  //   return (
  //     <div className="row">
  //       <div className="col-12">
  //         <div className="card">
  //           <div className="card__body">
  //             <Row>
  //               <Col>
  //                 <h2>Doanh Nghiệp</h2>
  //               </Col>
  //               <Col style={{ display: "flex", justifyContent: "flex-end" }}>
  //                 <input
  //                   className="searchTable"
  //                   type="text"
  //                   placeholder="Nhập dữ liệu ..."
  //                   value={this.state.value}
  //                   onChange={this.filterData}
  //                 />
  //               </Col>
  //             </Row>

  //             <table>
  //               <thead>
  //                 <tr>
  //                   <th>STT</th>
  //                   <th>Mã số</th>
  //                   <th>Hình đại diện</th>
  //                   <th>Tên</th>
  //                   <th>Số Điện Thoại</th>
  //                   <th>Email</th>
  //                   <th>Địa Chỉ</th>
  //                   <th>Mã số thuế</th>
  //                   <th>Giấy phép kinh doanh</th>
  //                   <th>Trạng Thái</th>
  //                   <th></th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {/* {this.state.value.length > 0 */}
  //                 {this.state.tableFilter.map((item, key) => {
  //                   return (
  //                     <tr
  //                       key={item.idUser}
  //                       onClick={() => {
  //                         this.routeChange(item);
  //                       }}
  //                     >
  //                       <td>
  //                         <b>#{key + 1}</b>
  //                       </td>
  //                       <td>{item.idUser}</td>
  //                       <td>
  //                         <img
  //                           className=" img-lg rounded-0"
  //                           width="100px"
  //                           height="100px"
  //                           src={`data:image/png;base64,${item.avatar}`}
  //                           // src={`data:image/png;base64,${item.avatar}`}
  //                           alt="avatar"
  //                         />
  //                       </td>
  //                       <td>{item.name}</td>
  //                       <td>{item.phone}</td>
  //                       <td>{item.emailUser}</td>
  //                       <td>
  //                         {item.address}, {item.wards}, {item.district},{" "}
  //                         {item.province}
  //                       </td>
  //                       <td>{item.masothue}</td>
  //                       <td>
  //                         <img
  //                           className="img-lg rounded-0"
  //                           width="100px"
  //                           height="100px"
  //                           src={`data:image/png;base64,${item.giayphepKD}`}
  //                           alt="Giấy phép"
  //                         />
  //                       </td>
  //                       <td>
  //                         {item.status === 0 ? (
  //                           <button
  //                             className="badge badge-danger"
  //                             onClick={() => this.updateStatus(item)}
  //                           >
  //                             Ngưng hoạt động
  //                           </button>
  //                         ) : (
  //                           <button
  //                             className="badge badge-success"
  //                             onClick={() => this.updateStatus(item)}
  //                           >
  //                             {" "}
  //                             Hoạt động
  //                           </button>
  //                         )}
  //                       </td>
  //                       <td></td>
  //                     </tr>
  //                   );
  //                 })}
  //               </tbody>
  //             </table>
  //             <div className="table__pagination">
  //               <ReactPaginate
  //                 className="pagination"
  //                 previousLabel={"<"}
  //                 nextLabel={">"}
  //                 breakLabel={"..."}
  //                 breakClassName={"break-me"}
  //                 pageCount={this.state.pageCount}
  //                 marginPagesDisplayed={2}
  //                 pageRangeDisplayed={5}
  //                 onPageChange={this.handlePageClick}
  //                 containerClassName={"pagination"}
  //                 subContainerClassName={"pages pagination"}
  //                 activeClassName={"active"}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}

export default Company;
