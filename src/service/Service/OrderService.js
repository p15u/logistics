import axios from "axios";
import HOST from "../API/Host";
class OrderService {
  getOrderCompany(id) {
    return axios.get(`${HOST}/order/getOrderCompany?id=` + id);
  }
  getHistory(id) {
    return axios.get(`${HOST}/history/getDelivering?idInfor=` + id);
  }
  getOrder() {
    return axios.get(`${HOST}/order/getAll`);
  }
  getByIdShipper(id) {
    return axios.get(`${HOST}/history/getByIdShipper?idShipper=` + id);
  }
  getOrderById(id) {
    return axios.get(`${HOST}/order/getOrderById?id=` + id);
  }
  getOrderByIdUser(id) {
    return axios.get(`${HOST}/order/getByIdUser?idUser=` + id);
  }
}
export default new OrderService();
