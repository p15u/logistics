import axios from "axios";
import HOST from "../API/Host";
class HistoryService {
  getOrderByTimeCom() {
    return axios.get(`${HOST}/history/getOrderByTimeCom`);
  }
  getOrderByTimeCancel() {
    return axios.get(`${HOST}/history/getOrderByTimeCancel`);
  }
  getOrderByTimeCompany(status, idUser) {
    return axios.get(`${HOST}/history/getOrderByTimeCompany?status=` + status + `&idUser=` + idUser);
  }
}
export default new HistoryService();
