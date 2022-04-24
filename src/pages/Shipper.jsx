import React, { useState, useEffect, PureComponent } from "react";

import ShipperService from "../service/Service/ShipperService";
import CustomerService from "../service/Service/CustomerService";

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
import { Row, Col } from "react-bootstrap";
export class Shipper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
    };
  }

  componentDidMount() {
    // setInterval(() => {
    this.getData();
    // }, 100);
  }

  //Lấy Dữ Liệu
  getData() {
    ShipperService.getShipper().then((res) => {
      this.setState({
        tableData: res.data,
      });
    });
  }
  //Cập nhật trạng thái

  routeChange(item) {
    let path = `/admin/shipperdetail`;
    console.log(item);
    this.props.history.push({
      pathname: path,
      state: { data: item.idUser },
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
        let path = `/admin/shipperdetail`;

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
          width: "200px",
        },
        filter: textFilter({
          style: {
            height: "35px",
            borderRadius: "10px",
            borderWidth: "1px",
            width: "170px",
          },
          placeholder: "Nhập tên...",
          onClick: (e) => console.log(e),
        }),
        headerStyle: (colum, colIndex) => {
          return { width: "200px", textAlign: "center" };
        },
      },
      {
        dataField: "phone",
        text: "SDT",
        style: {
          width: "120px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "120px", textAlign: "center" };
        },
      },
      {
        dataField: "emailUser",
        text: "Email",
        style: {
          width: "180px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "180px", textAlign: "center" };
        },
      },
      {
        dataField: "address",
        text: "Địa chỉ \n",
        align: "left",
        style: {
          width: "300px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "300px", textAlign: "center" };
        },
        filter: textFilter({
          style: {
            height: "35px",
            borderRadius: "10px",
            borderWidth: "1px",
            width: "270px",
          },
          placeholder: "Nhập địa chỉ...",
          onClick: (e) => console.log(e),
        }),
      },

      {
        dataField: "sumOrder",
        text: "Tổng đơn",
        sort: true,
        style: {
          width: "70px",
        },
        headerStyle: (colum, colIndex) => {
          return { width: "70px", textAlign: "center" };
        },
      },

      {
        dataField: "status",
        text: "Trạng thái",
        style: {
          width: "200px",
        },
        align: "left",

        headerStyle: (colum, colIndex) => {
          return { width: "200px", textAlign: "center" };
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
    // const columns = [
    //   {
    //     dataField: "idUser",
    //     text: "Mã số",
    //     sort: true,
    //     headerStyle: (colum, colIndex) => {
    //       return {
    //         width: "80px",
    //       };
    //     },

    //     style: {
    //       width: "80px",
    //     },
    //   },
    //   // {
    //   //   dataField: "avatar",
    //   //   text: "Hình đại diện",

    //   //   headerStyle: (colum, colIndex) => {
    //   //     return { width: "110px", textAlign: "center" };
    //   //   },
    //   //   style: {
    //   //     width: "110px",
    //   //   },
    //   //   formatter: (cell, row, rowIndex, extraData) => (
    //   //     <div>
    //   //       <img
    //   //         className=" img-lg rounded-0"
    //   //         height="80px"
    //   //         src={`data:image/png;base64,${row.avatar}`}
    //   //         alt="avatar"
    //   //       />
    //   //     </div>
    //   //   ),
    //   // },
    //   {
    //     dataField: "name",
    //     text: "Tên",
    //     sort: true,
    //     style: {
    //       width: "170px",
    //     },
    //     filter: textFilter({
    //       style: {
    //         height: "35px",
    //         borderRadius: "10px",
    //         borderWidth: "1px",
    //         width: "150px",
    //       },
    //       placeholder: "Nhập tên...",
    //       onClick: (e) => console.log(e),
    //     }),
    //     headerStyle: (colum, colIndex) => {
    //       return { width: "170px", textAlign: "center" };
    //     },
    //   },
    //   {
    //     dataField: "phone",
    //     text: "SDT",
    //     style: {
    //       width: "100px",
    //     },
    //     headerStyle: (colum, colIndex) => {
    //       return { width: "100px", textAlign: "center" };
    //     },
    //   },
    //   {
    //     dataField: "emailUser",
    //     text: "Email",
    //     style: {
    //       width: "110px",
    //     },
    //     headerStyle: (colum, colIndex) => {
    //       return { width: "110px", textAlign: "center" };
    //     },
    //   },
    //   {
    //     dataField: "address",
    //     text: "Địa chỉ \n",
    //     align: "left",
    //     style: {
    //       width: "300px",
    //     },
    //     headerStyle: (colum, colIndex) => {
    //       return { width: "300px", textAlign: "center" };
    //     },
    //     filter: textFilter({
    //       style: {
    //         height: "35px",
    //         borderRadius: "10px",
    //         borderWidth: "1px",
    //         width: "290px",
    //       },
    //       placeholder: "Nhập địa chỉ...",
    //       onClick: (e) => console.log(e),
    //     }),
    //   },

    //   {
    //     dataField: "idUser",
    //     text: "Tổng đơn",
    //     sort: true,
    //     style: {
    //       width: "70px",
    //     },
    //     headerStyle: (colum, colIndex) => {
    //       return { width: "70px", textAlign: "center" };
    //     },
    //   },
    //   {
    //     dataField: "idUser",
    //     text: "Đã giao",
    //     sort: true,
    //     style: {
    //       width: "70px",
    //     },

    //     headerStyle: (colum, colIndex) => {
    //       return { width: "70px", textAlign: "center" };
    //     },
    //   },
    //   {
    //     dataField: "status",
    //     text: "Trạng thái",
    //     style: {
    //       width: "228px",
    //     },

    //     headerStyle: (colum, colIndex) => {
    //       return { width: "228px", textAlign: "center" };
    //     },
    //     filter: selectFilter({
    //       options: () => selectOptionsArr,
    //       style: {
    //         height: "35px",
    //         borderRadius: "10px",
    //         borderWidth: "1px",
    //         width: "160px",
    //       },

    //       placeholder: "Chọn trạng thái",
    //       className: "test-classname",
    //       datamycustomattr: "datamycustomattr",
    //     }),

    //     formatter: (cell, row, rowIndex, extraData) =>
    //       this.getStatus(row.status),
    //   },
    // ];
    return (
      <div className="row">
        <div className="card">
          <div className="card__body">
            <Row>
              <Col>
                <h5>Danh sách tài xế </h5>
              </Col>
            </Row>
            <div
              style={
                {
                  // position: "relative",
                  // marginLeft: "10px",
                  // height: "56px",
                  // width: "1110px",
                  // overflow: "scroll",
                  // marginBottom: "10px",
                }
              }
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
      /**  <div className="row">
        <div className="card">
          <div>
            <Row>
              <Col>
                <h5>Danh sách tài xế </h5>
              </Col>
            </Row>
            <div
              style={{
                position: "relative",
                // height: "565px",
                width: "1120px",
                // overflow: "scroll",
                // marginBottom: "10px",
              }}
            >
              <BootstrapTable
                keyField="id"
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
      // </div>*/
    );
  }

  // render() {
  //   const filterData = (e) => {
  //     if (e.target.value != "") {
  //       this.setState({ value: e.target.value });
  //       const filterTable = this.state.dataTemp.filter((o) =>
  //         Object.keys(o).some((k) =>
  //           String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
  //         )
  //       );
  //       this.setState({ tableFilter: [...filterTable] });
  //     } else {
  //       this.setState({ value: e.target.value });
  //       this.setState({ dataTemp: [...this.state.dataTemp] });
  //     }
  //   };
  //   return (
  //     <div className="row">
  //       <div className="col-12">
  //         <div className="card">
  //           <div className="card__body">
  //             <Row>
  //               <Col>
  //                 <h2>Tài xế</h2>
  //               </Col>
  //               <Col style={{ display: "flex", justifyContent: "flex-end" }}>
  //                 <input
  //                   className="searchTable"
  //                   type="text"
  //                   placeholder="Nhập dữ liệu ..."
  //                   value={this.state.value}
  //                   onChange={filterData}
  //                 />
  //               </Col>
  //             </Row>

  //             <table>
  //               <thead>
  //                 <tr>
  //                   <th>Mã số</th>
  //                   <th>Hình đại diện</th>
  //                   <th>Tên</th>
  //                   <th>Số Điện Thoại</th>
  //                   <th>Email</th>
  //                   <th>Địa Chỉ</th>
  //                   <th>Thuộc công ty</th>
  //                   <th>Chứng minh nhân dân</th>
  //                   <th>Cân nặng xe</th>
  //                   <th>Giấy phép lái xe</th>
  //                   <th>Biển số xe</th>
  //                   <th>Trạng Thái</th>
  //                   <th></th>
  //                   <th></th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {this.state.value.length > 0
  //                   ? this.state.tableFilter.map((item) => {
  //                       return (
  //                         <tr
  //                           key={item.idUser}
  //                           onClick={() => {
  //                             this.routeChange(item);
  //                           }}
  //                         >
  //                           <td>{item.idUser}</td>
  //                           <td
  //                             style={{
  //                               textAlign: "center",
  //                             }}
  //                           >
  //                             <img
  //                               className=" img-lg rounded-0"
  //                               // width="100px"
  //                               height="100px"
  //                               src={`data:image/png;base64,${item.avatar}`}
  //                               alt="avatar"
  //                             />
  //                           </td>
  //                           <td>{item.name}</td>
  //                           <td>{item.phone}</td>
  //                           <td>{item.emailUser}</td>
  //                           <td>
  //                             {item.address}, {item.wards}, {item.district},{" "}
  //                             {item.province}
  //                           </td>
  //                           <td>{item.idCompany}</td>
  //                           <td>{item.cmtCode}</td>
  //                           <td>{item.weightCar}</td>
  //                           <td
  //                             style={{
  //                               textAlign: "center",
  //                             }}
  //                           >
  //                             <img
  //                               className=" img-lg rounded-0"
  //                               // width="100px"
  //                               height="100px"
  //                               src={`data:image/png;base64,${item.licensePlates}`}
  //                               alt="Giấy phép"
  //                             />
  //                           </td>
  //                           <td>{item.numberPlate}</td>
  //                           <td>
  //                             {item.status === 0 ? (
  //                               <button
  //                                 className="badge badge-danger"
  //                                 onClick={() => this.updateStatus(item)}
  //                               >
  //                                 Ngưng hoạt động
  //                               </button>
  //                             ) : (
  //                               <button
  //                                 className="badge badge-success"
  //                                 onClick={() => this.updateStatus(item)}
  //                               >
  //                                 {" "}
  //                                 Hoạt động
  //                               </button>
  //                             )}
  //                           </td>
  //                           <td></td>
  //                         </tr>
  //                       );
  //                     })
  //                   : this.state.dataTemp.map((item) => {
  //                       return (
  //                         <tr
  //                           key={item.idUser}
  //                           onClick={() => {
  //                             this.routeChange(item);
  //                           }}
  //                         >
  //                           <td>{item.idUser}</td>
  //                           <td
  //                             style={{
  //                               textAlign: "center",
  //                             }}
  //                           >
  //                             <img
  //                               className=" img-lg rounded-0"
  //                               // width="100px"
  //                               height="100px"
  //                               src={`data:image/png;base64,${item.avatar}`}
  //                               alt="avatar"
  //                             />
  //                           </td>
  //                           <td>{item.name}</td>
  //                           <td>{item.phone}</td>
  //                           <td>{item.emailUser}</td>
  //                           <td>
  //                             {item.address}, {item.wards}, {item.district},{" "}
  //                             {item.province}
  //                           </td>
  //                           <td>{item.idCompany}</td>
  //                           <td>{item.cmtCode}</td>
  //                           <td>{item.weightCar}</td>
  //                           <td
  //                             style={{
  //                               textAlign: "center",
  //                             }}
  //                           >
  //                             <img
  //                               className=" img-lg rounded-0"
  //                               // width="100px"
  //                               height="100px"
  //                               src={`data:image/png;base64,${item.licensePlates}`}
  //                               alt="Giấy phép"
  //                             />
  //                           </td>
  //                           <td>{item.numberPlate}</td>
  //                           <td>
  //                             {item.status === 0 ? (
  //                               <button
  //                                 className="badge badge-danger"
  //                                 onClick={() => this.updateStatus(item)}
  //                               >
  //                                 Ngưng hoạt động
  //                               </button>
  //                             ) : (
  //                               <button
  //                                 className="badge badge-success"
  //                                 onClick={() => this.updateStatus(item)}
  //                               >
  //                                 {" "}
  //                                 Hoạt động
  //                               </button>
  //                             )}
  //                           </td>
  //                           <td></td>
  //                         </tr>
  //                       );
  //                     })}
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

export default Shipper;
