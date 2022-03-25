import api from "./api";

export const ACTION_TYPES = {
    CREATE_IMAGE : 'CREATE_IMAGE',
    FETCH_ALL_IMAGES:'FETCH_ALL_IMAGES'
}

export function fetchAll(dispatch)  { 

    api.fileInformation().fetchAll()
    .then(response => {
        dispatch({
            type:ACTION_TYPES.FETCH_ALL_IMAGES,
            payload: response.data
        })
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

