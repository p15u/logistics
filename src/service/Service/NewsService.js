import axios from "axios";
import HOST from "../API/Host";
class NewsService{
    getNews(){
       return axios.get(`${HOST}/commercial/getAll`)
    }
    getById(id){
        return axios.get(`${HOST}/commercial/getById?idCom=`+id)
    }
    update(data){
        return axios.post(`${HOST}/commercial/update`,data)
    }
    updateImg(data){
        return axios.post(`${HOST}/commercial/updateImg`, data)
    }
    delete(id){
        return axios.post(`${HOST}/commercial/delete?idCom=`+id)
    }
    insert(data){
        return axios.post(`${HOST}/commercial/insert`,data)
    }
    insertImg(data){
        return axios.post(`${HOST}/commercial/insertImg`, data)
    }
}
export default new NewsService();