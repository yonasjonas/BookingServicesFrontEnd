import axios from "axios";

const baseURL = "http://localhost:4000/api/";

export default {
    businessService(url = baseURL + '') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id=> axios.get(url+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}