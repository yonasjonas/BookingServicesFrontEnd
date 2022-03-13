import axios from "axios";

const baseURL = "http://localhost:4000/";

export default {
    businessService(url = baseURL + 'api/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id=> axios.get(url+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },
    businessProvider(url = baseURL + 'providers/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id=> axios.get(url+id),
            //fetchByBusinessId: id=> axios.get(url + "business/" + id),
            //createProviderWorkingDays: (id, workingDaysHours) => axios.put(url + id, workingDaysHours),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },
    businessBooking(url = baseURL + 'bookings/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id=> axios.get(url+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },
    businesses(url = baseURL + 'businesses/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id=> axios.get(url+id),
            //fetchByBusinessId: id=> axios.get(url + "business/" + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}