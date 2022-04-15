export function convertStringToObject(arr) {

    if (typeof arr === "string") {
        return JSON.parse(arr);
    }
    else {
        return arr;
    }
}

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

const checkMinutes = (minutes) => {
    return minutes < 10 ? minutes + "0" : minutes;
}

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];



export const getRandomInt = (min, max, decimal) => {

    return (Math.random() * (max - min) + min).toFixed(decimal); //The maximum is exclusive and the minimum is inclusive
}