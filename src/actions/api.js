import axios from "axios";
import { accountService } from '../services';

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
            fetchAllFromSingleBusiness: (id) => axios.get(url + "business/" + id),
            fetchById: id=> axios.get(url+id),
            //fetchByBusinessId: id => axios.get(url + "business/" + id),
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
    },
    businessInformation(url = baseURL + 'accounts/') {
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
    
    
}
function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = accountService.userValue;
    const isLoggedIn = user && user.jwtToken;
    const isApiUrl = url.startsWith(baseURL);
    if (isLoggedIn && baseURL) {
        return { Authorization: `Bearer ${user.jwtToken}` };
    } else {
        return {};
    }
}