import api from "./api";

export const ACTION_TYPES = {
    CREATE : 'CREATE',
    UPDATE:'UPDATE',
    DELETE:'DELETE',
    FETCH_ALL:'FETCH_ALL'
}

const formatData = (data) => ({
    serviceName: String(data.serviceName ? data.serviceName : "" ),
    timeSlotDuration: parseInt(data.timeSlotDuration ? data.timeSlotDuration:0),    
    weekvalue: data.weekvalue,
    price: parseInt(data.price ? data.price:0),

});

export const fetchAll = () => dispatch => { 
    api.businessService().fetchAll()
    .then(response => {
        //console.log(response);
        dispatch({
            type:ACTION_TYPES.FETCH_ALL,
            payload: response.data
        })
    });    
};

export const create = (data, onSuccess) => dispatch => {
    data = formatData(data);
    console.log("from actions:", data);
    api.businessService().create(data)
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
    api.businessService().update(id, data)
    .then(response => {
        dispatch({
            type:ACTION_TYPES.UPDATE,
            payload: {id, ...data}
        })
        onSuccess()
    })
    .catch(error => console.log(error))
};

export const deleteData = (id, onSuccess) => dispatch => {
    api.businessService().delete(id)
        .then(response => {
            dispatch({
                type:ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
    })
    .catch(error => console.log(error));
};