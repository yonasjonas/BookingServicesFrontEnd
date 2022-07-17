let A = [1,3,5,2,4,5,2]
//let A = [1,3,5,2,4,5,2,1,3,7,4,2,5,2,4,1]
let X = 3; // number of appointments
let Y ; 2 // steps over
function getBest(A, X, Y){
    let arrLength = A.length;
    let result = 0;
    let numberOfOptions = arrLength - (X*Y);
    for (let i = 0; i < arrLength; i += X){
        result += A[i];
    }



}

function getResult(){

}