export function convertStringToObject(arr) {

    if (typeof arr === "string") {
        return JSON.parse(arr);
    }
    else{
        return arr;
    }
}