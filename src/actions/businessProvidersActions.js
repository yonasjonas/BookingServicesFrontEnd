import api from "./api";

export const ACTION_TYPES = {
    CREATE2 : 'CREATE2',
    UPDATE2:'UPDATE2',
    DELETE2:'DELETE2',
    FETCH_ALL2:'FETCH_ALL2',
    ADD_TIMES: 'ADD_TIMES'
}

const formatData = (data) => ({
    name: String(data.name ? data.name : "" ),
    email: String(data.email ? data.email : "" ),   
    weekvalue: String(JSON.stringify(data.weekvalue) ? JSON.stringify(data.weekvalue) : "" ),
    phone: String(data.phone ? data.phone : "" ),
    //businessId: Number(!isNaN(data.businessId) ? parseInt(data.businessId) : 1),
});

export const fetchAll = () => dispatch => { 

api.businessProvider().fetchAll()
    .then(response => {
        let dataLocal = Object.assign({}, response)
        //dataLocal.weekvalue = dataLocal.weekvalue.split(',');
        console.log("from actions:", response.data);
        /* for (let i = 0; i < response.data.length; i++) {
            //dataLocal.data[i].weekvalue  = response.data[i].weekvalue.split(',');            
        } */


        dispatch({
            type:ACTION_TYPES.FETCH_ALL2,
            payload: dataLocal.data
        })
    });
};

export const addProviderWorkingDays = (data) => dispatch => {

    //console.log("addProviderWorkingDays data: ", data);
    dispatch({
        type:ACTION_TYPES.ADD_TIMES,
        payload: {data}
    })
};

export const create = (data, onSuccess) => dispatch => {
    data = formatData(data);
    console.log("create data: ", data);    
    api.businessProvider().create(data)
        .then(response => {
            dispatch({
                type:ACTION_TYPES.CREATE2,
                payload: response.data
            })
            onSuccess()
        })
        .catch(error => console.log(error));
};

export const update = (id, data, onSuccess) => dispatch => {
    data = formatData(data);    
    let dataLocal = Object.assign({}, data)
    //dataLocal.weekvalue = dataLocal.weekvalue.split(',');   
    api.businessProvider().update(id, data)
    .then(response => {
        dispatch({
            type:ACTION_TYPES.UPDATE2,
            payload: {id, ...dataLocal}
        })
        onSuccess()
    })
    .catch(error => console.log(error))
};

export const deleteData = (id, onSuccess) => dispatch => {
    api.businessProvider().delete(id)
        .then(response => {
            dispatch({
                type:ACTION_TYPES.DELETE2,
                payload: id
            })
            onSuccess()
    })
    .catch(error => console.log(error));
};