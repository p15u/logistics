import axios from "axios";
import HOST from "../API/Host";
class PostService {
  getPost(id) {
    return axios.get(`${HOST}/shipperpost/getPostById?id=` + id);
  }
}
export default new PostService();
