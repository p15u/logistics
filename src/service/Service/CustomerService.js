import axios from "axios";
import HOST from "../API/Host";
class CustomerService {
  getCustomer() {
    return axios.get(`${HOST}/user/getAllUser`);
  }
  updateStatus(data) {
    return axios.post(`${HOST}/user/changeStatusWeb`, data);
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
  getCustomerCompany(id) {
    return axios.get(`${HOST}/user/getCustomerCompany?idUser=` + id);
  }
  activeAccount(data) {
    return axios.post(`${HOST}/user/activeAccount`, data);
  }
}
export default new CustomerService();
