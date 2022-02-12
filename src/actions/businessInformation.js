import api from "./api";

export const ACTION_TYPES = {
    CREATE : 'CREATE',
    UPDATE:'UPDATE',
    DELETE:'DELETE',
    FETCH_ALL:'FETCH_ALL'
}

const formatData = (data) => ({
    name: String(data.name ? data.name : "" ),
    email: String(data.email ? data.email : "" ),
    weekvalue: data.weekvalue.toString(),
    phone: String(data.phone ? data.phone : "" ),

});

export const fetchAll = () => dispatch => { 

    api.businessInformation().fetchAll()
    .then(response => {
        let dataLocal = Object.assign({}, response)
        //dataLocal.weekvalue = dataLocal.weekvalue.split(',');
        //console.log("from actions:", response.data);
        for (let i = 0; i < response.data.length; i++) {
            //dataLocal.data[i].weekvalue  = response.data[i].weekvalue.split(',');            
        }

        dispatch({
            type:ACTION_TYPES.FETCH_ALL,
            payload: dataLocal.data
        })
    });    
};

export const create = (data, onSuccess) => dispatch => {
    data = formatData(data);
    api.businessInformation().create(data)
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
    dataLocal.weekvalue = dataLocal.weekvalue.split(',');   
    api.businessInformation().update(id, data)
    .then(response => {
        dispatch({
            type:ACTION_TYPES.UPDATE,
            payload: {id, ...dataLocal}
        })
        onSuccess()
    })
    .catch(error => console.log(error))
};

export const deleteData = (id, onSuccess) => dispatch => {
    api.businessInformation().delete(id)
        .then(response => {
            dispatch({
                type:ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
    })
    .catch(error => console.log(error));
};