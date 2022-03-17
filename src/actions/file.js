import { userConstants } from '../constants';
import { accountService } from '../services/account.service';
import { alertActions } from './alert.actions';
import { history } from '../helpers/history';
import api from "./api";



export const fileActions = {
    postImage,
    fetchById
};

function fetchById(dispatch) { 

    api.fileInformation().fetchById(JSON.parse(localStorage.user).id)
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

function postImage(selectedFile) {

    const formData = new FormData();

    formData.append('File', selectedFile);
    formData.append('Type', "businessInformationCover");
    formData.append('FileName', selectedFile.name);
    formData.append('BusinessId', JSON.parse(localStorage.user).id);


    fetch(
        'http://localhost:4000/upload/image/file',
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

