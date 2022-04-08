import axios from "axios";
import host from "../API/Host";

const HOST = host;

class profileService {
  information(data) {
    return axios.post(`${HOST}/user/getUserById`, data);
  }

  update(data) {
    return axios.post(`${HOST}/user/update`, data);
  }

  updateCompany(data) {
    return axios.post(`${HOST}/company/update`, data);
  }

  updateImg(data) {
    const form = new FormData();
    form.append("id", data.id);
    form.append("file", data.file);

    return axios.post(`${HOST}/shipper/updateAvatarUser`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  getProvince() {
    return axios.get(`${HOST}/address/getAllProvince`);
  }
  getDistrict() {
    return axios.get(`${HOST}/address/getAllDistrict`);
  }
  getWards() {
    return axios.get(`${HOST}/address/getAllWards`);
  }
}
export default new profileService();
