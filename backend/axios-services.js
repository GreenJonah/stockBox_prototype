const axios = require('axios');

// let localStorage = null;
// if ((typeof localStorage === "undefined" || localStorage === null)) {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./local-storage');
//     console.log("INITIALIZED THE LOCALSTORAGE");
// }

const iextradingURL = axios.create({
    baseURL: "https://api.iextrading.com/1.0"
});

const firebaseURL = axios.create({
    baseURL: "https://stock-box-prototype.firebaseio.com/sessions/"
});

module.exports = {
    iextradingURL,
    firebaseURL
};