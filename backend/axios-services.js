const axios = require('axios');

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