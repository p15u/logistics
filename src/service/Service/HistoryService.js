import axios from "axios";
import HOST from "../API/Host";
class HistoryService {
  getOrderByTimeCom() {
    return axios.get(`${HOST}/history/getOrderByTimeCom`);
  }
  getOrderByTimeCancel() {
    return axios.get(`${HOST}/history/getOrderByTimeCancel`);
  }
}
export default new HistoryService();
