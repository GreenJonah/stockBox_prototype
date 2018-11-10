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

module.exports = {
    getStockLogoURLFromExternalAPI
};