import api from "./api";

export const ACTION_TYPES = {
    CREATE : 'CREATE',
    UPDATE:'UPDATE',
    DELETE:'DELETE',
    FETCH_ONE_BUSINESS:'FETCH_ONE_BUSINESS'
}

const formatData = (data) => ({
    AcceptTerms: Boolean(data.AcceptTerms ? data.AcceptTerms : false ),
    Address1: String(data.Address1 ? data.Address1 : "" ),
    Address2: String(data.Address2 ? data.Address2 : "" ),
    BusinessName: String(data.BusinessName ? data.BusinessName : "" ),
    Country: String(data.Country ? data.Country : "" ),
    County: String(data.County ? data.County : "" ),
    Description: String(data.Description ? data.Description : "" ),
    Email: String(data.Email ? data.Email : "" ),
    Phone: String(data.Phone ? data.Phone : "" ),
    Category: String(data.Category ? data.Category : "" ),    
});

export const fetchById = (id) => dispatch => {

    api.businessInformation().fetchById(id)
    .then(response => {
        let dataLocal = Object.assign({}, response)
        //dataLocal.weekvalue = dataLocal.weekvalue.split(',');
        //console.log("from actions:", response.data);
        for (let i = 0; i < response.data.length; i++) {
            //dataLocal.data[i].weekvalue  = response.data[i].weekvalue.split(',');            
        }

        dispatch({
            type:ACTION_TYPES.FETCH_ONE,
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
    //dataLocal.weekvalue = dataLocal.weekvalue.split(',');   
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