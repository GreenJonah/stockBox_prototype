const {firebaseURL} = require('./axios-services');

// GET STOCK DATA FROM DATABASE
const getAllStockDataFromFirebase = async () => {
    
    let market = [];

    await firebaseURL.get("/stocks/owned_stocks.json")
        .then(response => {
            Object.keys(response.data).forEach(function (key) {
                market.push({ ...response.data[key], key })
            });
        })
        .catch(error => {
            market = null
        });

    return market;
}

// GET SYMBOL DATA FROM DATABASE
const getAllSymbolDataFromDatabase = async () => {
    
    let symbols = [];

    await firebaseURL.get("/stocks/symbols.json")
        .then(response => {
            Object.keys(response.data).forEach(function (key) {
                symbols.push({ ...response.data[key], key })
            });
        })
        .catch(error => {
            console.log("Failed");
        });

    return symbols;
}

// POST STOCK DATA TO FIREBASE
const postStockDataToFirebase = async (data) => {

    let newData = null;

    await firebaseURL.post("/stocks/owned_stocks.json", data)
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

    await firebaseURL.post("/stocks/symbols.json", data)
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

    await firebaseURL.put("/stocks/owned_stocks/" + key + ".json", data);
}

// DELETE STOCK DATA FROM DATABASE
const deleteStockDataFromFirebase = async (key) => {
    await firebaseURL.delete("/stocks/owned_stocks/" + key + ".json");
}

module.exports = {
    getAllStockDataFromFirebase,
    getAllSymbolDataFromDatabase,
    postStockDataToFirebase,
    deleteStockDataFromFirebase,
    putStockDataToFirebase,
    postSymbolDataToFirebase
};