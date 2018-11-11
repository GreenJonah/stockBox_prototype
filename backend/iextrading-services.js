const {iextradingURL} = require('./axios-services');

// GET STOCK LOGO FROM EXTERNAL API
const getStockLogoURLFromExternalAPI = async (symbol) => {
    
    // Backup picture
    let logoURL = "https://storage.googleapis.com/iex/api/logos/CLDX.png";

    await iextradingURL.get("/stock/" + symbol + "/logo")
        .then(response => {
            console.log("Response data: ", response.data);
            logoURL = response.data.url;
        })
        .catch(error => {
            logoURL = ""
        });

    return logoURL;
}

// GET STOCK DATA FROM EXTERNAL API
const getStockDataFromExternalAPI = async (symbol, date) => {
    
    let stock = null;

    await iextradingURL.get("/stock/" + symbol + "/chart/date/" + date)
        .then(response => {
            console.log("Response length: " + response.data.length);
            let index = response.data.length - 1;
            console.log("Object: ", response.data[index]);
            stock = response.data[index]
        })
        .catch(error => {
            console.log("FAILED TO GET STOCK FROM EXTERNAL API SOURCE")
        });

    return stock;
}

// SHOULD BE DELETED EVENTUALLY
const getStockChart = async (symbol) => {
    
    let data = null;

    await iextradingURL.get("/stock/" + symbol + "/chart/5y")
        .then(response => {
            data = response.data
        })
        .catch(error => {
            console.log("FAILED TO GET STOCK FROM EXTERNAL API SOURCE")
        });

    return data;
}

module.exports = {
    getStockLogoURLFromExternalAPI,
    getStockDataFromExternalAPI,
    getStockChart
};