import axios from "axios";
import Cookies from "js-cookie";
import host from "../API/Host";
const HOST = host;

class Authentication {
  avatar = "";
  constructor() {
    this.getImg(Cookies.get("id"));
  }
  login(data) {
    return axios.post(`${HOST}/user/login`, data);
  }
  getSendMail(email) {
    return axios.post(`${HOST}/email/sendMail?mail=` + email);
  }
  changePass(idUser, oldPass, newPass) {
    return axios.post(
      `${HOST}/user/changePass?idUser=` +
        idUser +
        `&oldPass=` +
        oldPass +
        `&newPass=` +
        newPass
    );
  }
  getForgotPass(value) {
    return axios.post(`${HOST}/email/emailFogotPass?mail=` + value);
  }
  getUpdatePass(idUser, pass) {
    return axios.post(
      `${HOST}/user/updatePasswordUser?idUser=` +
        idUser +
        `&passwordUser=` +
        pass
    );
  }

  registerCompany(data) {
    return axios.post(`${HOST}/company/insert`, data);
  }
  setAvatar(str) {
    this.avatar = str;
  }
  getAvatar() {
    return this.avatar;
  }
  getImg(value) {
    axios
      .get(`${HOST}/user/getImg?idUser=` + value)
      .then((res) => this.setAvatar(res.data));
    // return axios.get(`${HOST}/user/getImg?idUser=` + value);
  }
}
export default new Authentication();
