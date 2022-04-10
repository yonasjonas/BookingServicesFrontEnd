import api from "./api";

export const ACTION_TYPES = {
    CREATE2 : 'CREATE2',
    UPDATE2:'UPDATE2',
    DELETE2:'DELETE2',
    FETCH_ALL_BUSINESSES:'FETCH_ALL_BUSINESSES',
    FETCH_ONE_BUSINESS:'FETCH_ONE_BUSINESS'
}

const formatData = (data) => ({
    name: String(data.name ? data.name : "" ),
    email: String(data.email ? data.email : "" ),
    weekvalue: data.weekvalue.toString(),
    phone: String(data.phone ? data.phone : "" ),

});

export const fetchAll = () => dispatch => { 

    api.businesses().fetchAll()
    .then(response => {
        let dataLocal = Object.assign({}, response)

        dispatch({
            type:ACTION_TYPES.FETCH_ALL_BUSINESSES,
            payload: dataLocal.data
        })
    });    
};

export const fetchById = (id) => dispatch => {

    api.businesses().fetchById(id)
    .then(response => {
        let dataLocal = Object.assign({}, response)
        //dataLocal.weekvalue = dataLocal.weekvalue.split(',');
        //console.log("from actions:", response.data);
        for (let i = 0; i < response.data.length; i++) {
            //dataLocal.data[i].weekvalue  = response.data[i].weekvalue.split(',');            
        }

        dispatch({
            type:ACTION_TYPES.FETCH_ALL_BUSINESSES,
            payload: dataLocal.data
        })
    });    
};

export const create = (data, onSuccess) => dispatch => {
    data = formatData(data);
    api.businesses().create(data)
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
    dataLocal.weekvalue = dataLocal.weekvalue.split(',');   
    api.businesses().update(id, data)
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
    api.businesses().delete(id)
        .then(response => {
            dispatch({
                type:ACTION_TYPES.DELETE2,
                payload: id
            })
            onSuccess()
    })
    .catch(error => console.log(error));
};