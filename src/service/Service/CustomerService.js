import axios from "axios";
import HOST from "../API/Host";
class CustomerService {
  getCustomer() {
    return axios.get(`${HOST}/user/getAllUser`);
  }
  updateStatus(data) {
    return axios.post(`${HOST}/user/changeStatus`, data);
  }
  getAllAccount() {
    return axios.get(`${HOST}/user/getAllAccount`);
  }
  countUser(value) {
    return axios.get(`${HOST}/user/countUser?idRole=` + value);
  }
  getUserById(id) {
    return axios.get(`${HOST}/user/getUserById?idUser=` + id);
  }
}
export default new CustomerService();
