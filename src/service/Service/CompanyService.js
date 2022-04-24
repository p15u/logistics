import axios from "axios";
import HOST from "../API/Host";
class CompanyService {
  getCompany() {
    return axios.get(`${HOST}/company/getAllCompany`);
  }
  getComAll() {
    return axios.get(`${HOST}/company/getAll`);
  }
  getCompanyById(id) {
    return axios.get(`${HOST}/company/getCompanyById?id=` + id);
  }
  updateGiayPhep(data) {
    return axios.post(`${HOST}/company/updateGiayPhep`, data);
  }
}
export default new CompanyService();
