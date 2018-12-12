const {firebaseURL} = require('./axios-services');

// GET STOCK DATA FROM DATABASE
const getAllStockDataFromFirebase = async () => {
    
    let market = [];

    await firebaseURL.get("/owned_stocks.json")
        .then(response => {
            Object.keys(response.data).forEach(function (key) {
                market.push({ ...response.data[key], key })
            });
        })
        .catch(error => {
            console.log("Failed to retrieve stocks")
        });

    return market;
}

// GET SESSION DATES FROM DATABASE
const getAllSessionDatesFromFirebase = async () => {
    let sessionDates = {};

    await firebaseURL.get("/sessionDates.json")
        .then(response => {
            sessionDates = response.data;
        })
        .catch(error => {
            console.log("Failed to retrieve session dates")
        });

    return sessionDates;
}

// GET PORFOLIO DATA FROM DATABASE
const getPortfolioDataFromFirebase = async () => {
    let portfolio = {};

    await firebaseURL.get("/portfolio.json")
        .then(response => {
            portfolio = response.data;
        })
        .catch(error => {
            console.log("Failed to retrieve portfolio data")
        });

    return portfolio;
}

// GET SYMBOL DATA FROM DATABASE
const getAllSymbolDataFromDatabase = async () => {
    
    let symbols = [];

    await firebaseURL.get("https://stock-box-prototype.firebaseio.com/symbols.json")
        .then(response => {
            Object.keys(response.data).forEach(function (key) {
                symbols.push({ ...response.data[key], key })
            });
        })
        .catch(error => {
            console.log("Failed to retrieve symbols");
        });

    return symbols;
}

// POST STOCK DATA TO FIREBASE
const postStockDataToFirebase = async (data) => {

    let newData = null;

    await firebaseURL.post("/owned_stocks.json", data)
        .then(response => {
            let key = response.data.name;
            console.log("Key value: ", key);
            newData = { ...data, key };
        })
        .catch(error => {
            console.error("POST Request failed: ", error);
        });
        
    return newData;
}

// // POST SYMBOL DATA TO FIREBASE
const postSymbolDataToFirebase = async (data) => {

    let newData = null;

    await firebaseURL.post("https://stock-box-prototype.firebaseio.com/symbols.json", data)
        .then(response => {
            console.log("POST: Response from the database: ", response);
            let key = response.data.name;
            newData = { ...data, key };
        })
        .catch(error => {
            console.error("POST Request failed: ", error);
        });
        
    return newData;
}

// // PUT STOCK DATA TO FIREBASE
const putStockDataToFirebase = async (data) => {

    let key = data.key;
    delete data.key;

    await firebaseURL.put("/owned_stocks/" + key + ".json", data);
}

// // PUT PORTFOLIO DATA TO FIREBASE
const putPortfolioDataToFirebase = async (data) => {

    await firebaseURL.put("/portfolio.json", data);
}

// // PUT PORTFOLIO DATA TO FIREBASE
const putSessionDatesToFirebase = async (data) => {

    await firebaseURL.put("/sessionDates.json", data);
}

// DELETE STOCK DATA FROM DATABASE
const deleteStockDataFromFirebase = async (key) => {
    await firebaseURL.delete("/owned_stocks/" + key + ".json");
}

module.exports = {
    getAllStockDataFromFirebase,
    getAllSymbolDataFromDatabase,
    postStockDataToFirebase,
    deleteStockDataFromFirebase,
    putStockDataToFirebase,
    postSymbolDataToFirebase,
    putPortfolioDataToFirebase,
    getAllSessionDatesFromFirebase,
    putSessionDatesToFirebase,
    getPortfolioDataFromFirebase
};