import api from "./api";

export const ACTION_TYPES = {
    CREATE : 'CREATE',
    UPDATE:'UPDATE',
    DELETE:'DELETE',
    FETCH_ALLBOOKINGS:'FETCH_ALLBOOKINGS'
}

const formatData = (data) => ({
    
    name: String(data.name ? data.name : "" ),
    email: String(data.email ? data.email : "" ),
    phone: String(data.phone ? data.phone : "" ),
    providerId: Number(!isNaN(data.providerId) ? data.providerId : 0 ),
    providerName: String(data.providerName ? data.providerName : "" ),
    serviceId: Number(!isNaN(data.serviceId) ? data.serviceId : 0 ),
    serviceName: String(data.serviceName ? data.serviceName : "" ),
    bookingStartTime: String(data.bookingStartTime ? data.bookingStartTime : "" ),
    bookingDuration: Number(data.bookingDuration ? data.bookingDuration : 0 ),
    BusinessId: Number(!isNaN(data.businessId) ? data.businessId : parseInt(data.BusinessId) ),
    accepted: String(data.accepted)

});

export const fetchAll = (businessId) => dispatch => { 

    api.businessBooking().fetchAll(businessId)
    .then(response => {
        let dataLocal = Object.assign({}, response)
        dispatch({
            type:ACTION_TYPES.FETCH_ALLBOOKINGS,
            payload: dataLocal.data
        })
    });    
};

export const create = (data, onSuccess) => dispatch => {
    data = formatData(data);
    api.businessBooking().create(data)
        .then(response => {
            dispatch({
                type:ACTION_TYPES.CREATE,
                payload: response.data
            })
            onSuccess()
        })
        .catch(error => console.log(error));
};

export const update = (id, data, onSuccess) => dispatch => {
    data = formatData(data);    
    let dataLocal = Object.assign({}, data)
    dataLocal.weekvalue = dataLocal.weekvalue && dataLocal.weekvalue.split(',');   
    api.businessBooking().update(id, data)
    .then(response => {
        dispatch({
            type:ACTION_TYPES.UPDATE,
            payload: {id, ...dataLocal}
        })
        onSuccess()
    })
    .catch(error => console.log(error))
};

export const confirmBooking = (id, accept) => dispatch => {

    api.businessBooking().update(id, accept)

}

export const deleteData = (id, onSuccess) => dispatch => {
    api.businessBooking().delete(id)
        .then(response => {
            dispatch({
                type:ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
    })
    .catch(error => console.log(error));
};