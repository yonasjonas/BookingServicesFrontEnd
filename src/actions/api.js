import axios from "axios";
import { accountService } from '../services';

const baseURL = "http://localhost:4000/";

export default {
    businessService(url = baseURL + 'api/services/') {
        return {
            fetchAllFromAll: () => axios.get(url),
            fetchAll: businessId => axios.get(url + "business/" + businessId ),
            fetchById: id=> axios.get(url+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },
    businessProvider(url = baseURL + 'api/providers/') {
        return {
            fetchAllFromAll: () => axios.get(url),
            fetchAll: businessId => axios.get(url + "business/" + businessId ),
            fetchAllFromSingleBusiness: (id) => axios.get(url + "business/" + id),
            fetchById: id=> axios.get(url+id),
            //fetchByBusinessId: id => axios.get(url + "business/" + id),
            //createProviderWorkingDays: (id, workingDaysHours) => axios.put(url + id, workingDaysHours),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },
    businessBooking(url = baseURL + 'api/bookings/') {
        return {
            fetchAllFromAll: () => axios.get(url),
            fetchAll: (id) => axios.get(url + "business/" + id),
            fetchById: id=> axios.get(url+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },
    businesses(url = baseURL + 'api/businessinfo/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id=> axios.get(url+id),
            //fetchByBusinessId: id=> axios.get(url + "business/" + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },
    businessInformation(url = baseURL + 'api/accounts/') {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(url) },
            credentials: 'include'
        };
        return {
            fetchById: id=> axios.get(url+id, requestOptions),
            //fetchByBusinessId: id=> axios.get(url + "business/" + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord, requestOptions),
            delete: id => axios.delete(url + id)
        }
    },
    fileInformation(url = baseURL + 'api/upload/') {        
        return {
            //fetchImageById: id => axios.get(url+id),
            fetchAll: () => axios.get(url),
            postImage: newRecord => axios.post(url, newRecord),
            /*update: (id, updateRecord) => axios.put(url + id, updateRecord, requestOptions),
            delete: id => axios.delete(url + id) */
        }
    },

    
    
}
function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = JSON.parse(localStorage.getItem('user'))
    const isLoggedIn = user && user.jwtToken;
    const isApiUrl = url.startsWith(baseURL);
    if (isLoggedIn && baseURL) {
        return { Authorization: `Bearer ${user.jwtToken}` };
    } else {
        return {};
    }
}