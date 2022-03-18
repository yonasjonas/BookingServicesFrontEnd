import { userConstants } from '../constants';
import { accountService } from '../services/account.service';
import { alertActions } from './alert.actions';
import { history } from '../helpers/history';
import api from "./api";


export function fetchImageById (dispatch)  { 

    api.fileInformation().fetchImageById(JSON.parse(2))
    .then(response => {
        let dataLocal = Object.assign({}, response)
        //dataLocal.weekvalue = dataLocal.weekvalue.split(',');
        //console.log("from actions:", response.data);
        for (let i = 0; i < response.data.length; i++) {
            //dataLocal.data[i].weekvalue  = response.data[i].weekvalue.split(',');            
        }

        /* dispatch({
            type:ACTION_TYPES.FETCH_ONE,
            payload: dataLocal.data
        }) */
    });    
};

export const postImage = (selectedFile)  =>{

    const formData = new FormData();

    formData.append('File', selectedFile);
    formData.append('Type', "businessInformationCover");
    formData.append('FileName', selectedFile.name);
    formData.append('BusinessId', JSON.parse(localStorage.user).id);


    fetch(
        'http://localhost:4000/api/upload/image/file',
        {
            method: 'POST',
            body: formData,
        }
    )
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

