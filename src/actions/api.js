import axios from "axios";

const baseURL = "https://localhost:44365/api/";

export default {
    businessService(url = baseURL + 'BusinessServices/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id=> axios.get(url+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}