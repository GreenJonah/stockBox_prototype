const {firebaseURL} = require('./axios-services');

// GET STOCK DATA FROM DATABASE
const getAllStockDataFromFirebase = async (sessionKey) => {
    
    let market = [];

    await firebaseURL.get("/"+sessionKey+"/owned_stocks.json")
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
const getAllSessionDatesFromFirebase = async (sessionKey) => {
    let sessionDates = {};

    await firebaseURL.get("/"+sessionKey+"/sessionDates.json")
        .then(response => {
            sessionDates = response.data;
        })
        .catch(error => {
            console.log("Failed to retrieve session dates")
        });

    return sessionDates;
}

// GET PORFOLIO DATA FROM DATABASE
const getPortfolioDataFromFirebase = async (sessionKey) => {
    let portfolio = {};

    await firebaseURL.get("/"+sessionKey+"/portfolio.json")
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

// POST NEW SESSION TO FIREBASE
const postNewSessionToFirebase = async (data) => {

    let key = null;

    await firebaseURL.post("https://stock-box-prototype.firebaseio.com/sessions.json", data)
        .then(response => {
            key = response.data.name;
            console.log("Key value: ", key);
        })
        .catch(error => {
            console.error("POST Request failed: ", error);
        });
        
    return key;
}

// POST STOCK DATA TO FIREBASE
const postStockDataToFirebase = async (data, sessionKey) => {

    let newData = null;

    await firebaseURL.post("/"+sessionKey+"/owned_stocks.json", data)
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
const putStockDataToFirebase = async (data, sessionKey) => {

    let key = data.key;
    delete data.key;

    await firebaseURL.put("/"+sessionKey+"/owned_stocks/" + key + ".json", data);
}

// // PUT PORTFOLIO DATA TO FIREBASE
const putPortfolioDataToFirebase = async (data, sessionKey) => {

    await firebaseURL.put("/"+sessionKey+"/portfolio.json", data);
}

// // PUT PORTFOLIO DATA TO FIREBASE
const putSessionDatesToFirebase = async (data, sessionKey) => {

    await firebaseURL.put("/"+sessionKey+"/sessionDates.json", data);
}

// DELETE STOCK DATA FROM DATABASE
const deleteStockDataFromFirebase = async (key, sessionKey) => {
    await firebaseURL.delete("/"+sessionKey+"/owned_stocks/" + key + ".json");
}

module.exports = {
    getAllStockDataFromFirebase,
    getAllSymbolDataFromDatabase,
    getAllSessionNamesFromFirebase,
    postNewSessionToFirebase,
    postStockDataToFirebase,
    deleteStockDataFromFirebase,
    putStockDataToFirebase,
    postSymbolDataToFirebase,
    putPortfolioDataToFirebase,
    getAllSessionDatesFromFirebase,
    putSessionDatesToFirebase,
    getPortfolioDataFromFirebase
};