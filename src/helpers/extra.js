
// great for returning object from string used in providers time sliders  
export function convertStringToObject(arr) {

    if (typeof arr === "string") {
        return JSON.parse(arr);
    }
    else {
        return arr;
    }
}
// checks if image exists and returns info
export const checkImage = (path) => {
    const img = new Image();
    new Promise((resolve) => {
        img.onload = () => resolve({ path, status: "ok" });
        img.onerror = () => resolve({ path, status: "error" });
        img.src = path;
    }).then((result) => {
        if (result.status == "ok") { console.log("ok?", result.status); return true; }
        else if (result.status == "error") { console.log("not?", result.status); return false; }

    });
};

export const convertDate = (date) => {
    let localdate;
    typeof date === 'object' ? localdate = date : localdate = new Date(date.replace(/['"]+/g, ''));
    return localdate.getDay() + " " + monthNames[localdate.getMonth()] + " " + localdate.getFullYear() + " " + localdate.getHours() + ":" + checkMinutes(localdate.getMinutes());

}
// handy to get Service Image from anywhere
export const getServiceImage = (id, businessId, location) => {
    const d = new Date();
    let path = "https://nixerwebapi.azurewebsites.net/images/business/" + businessId + "/service/serviceImage_" + id + ".jpg?" + d.getTime();
    const imageInfo = checkImage(path);
    console.log("imageInfo", imageInfo);
    return <img className={"providerImage_" + location} src={path} />;
}

// handy to get provider image from anywhere
export const getProviderImage = (id, businessId, location) => {
    const d = new Date();
    let path = "https://nixerwebapi.azurewebsites.net/images/business/" + businessId + "/provider/providerImage_" + id + ".jpg?" + d.getTime();
    return <img className={"providerImage_" + location} src={path} />;
}

const checkMinutes = (minutes) => {
    return minutes < 10 ? minutes + "0" : minutes;
}

//used for months 
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


// generating random number for dummy reviews
export const getRandomInt = (min, max, decimal) => {

    return (Math.random() * (max - min) + min).toFixed(decimal); //The maximum is exclusive and the minimum is inclusive
}