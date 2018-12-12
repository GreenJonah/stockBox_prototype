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

// GET SESSION NAMES FROM FIREBASE
const getAllSessionNamesFromFirebase = async () => {
    let sessions = [];

    console.log("HERE");

    // FIND HOW TO GET THE SESSION NAME IN THE URL
    await firebaseURL.get("https://stock-box-prototype.firebaseio.com/sessions.json")
    .then(response => {
        Object.keys(response.data).forEach(function (key) {
            sessions.push({name: response.data[key].sessionName, key: key});
        });
    })
    .catch(error => {
        console.log("Failed to retrieve session names");
    });
    
    return sessions;
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

// DELETE STOCK DATA FROM DATABASE
const deleteStockDataFromFirebase = async (key) => {
    await firebaseURL.delete("/owned_stocks/" + key + ".json");
}

module.exports = {
    getAllStockDataFromFirebase,
    getAllSymbolDataFromDatabase,
    getAllSessionNamesFromFirebase,
    postStockDataToFirebase,
    deleteStockDataFromFirebase,
    putStockDataToFirebase,
    postSymbolDataToFirebase,
    putPortfolioDataToFirebase
};