import axios from "axios";
import HOST from "../API/Host";
class ShipperService {
  getShipper() {
    return axios.get(`${HOST}/shipper/getAllShipper`);
  }
  getInforShipper() {
    return axios.get();
  }
  getShipperCompany(id) {
    return axios.get(`${HOST}/shipper/getShipperCompany?id=` + id);
  }
  getShipperById(id) {
    return axios.get(`${HOST}/shipper/getShipperById?idShipper=` + id);
  }
}
export default new ShipperService();
