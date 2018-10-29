import { firebaseURL } from '../axios-service';

// POST STOCK DATA TO FIREBASE
export const postStockDataToFirebase = async (data) => {

    let newData = null;

    await firebaseURL.post("/stocks/owned_stocks.json", data)
        .then(response => {
            console.log("POST: Response from the database: ", response);
            let key = response.data.name;
            newData = { ...data, key };
        })
        .catch(error => {
            console.error("POST Request failed: ", error);
        });

    // Need to return new post with key
    // async getPostValue () {
    //     let newStock = await FirebaseServices.postDateToFirebase();
    //     console.log("NEW STOCK: ", newStock);
    //     return newStock;
    // }
    return newData;
}

// PUT STOCK DATA TO FIREBASE
export const putStockDataToFirebase = (data) => {

    let key = data.key;
    delete data.key;

    firebaseURL.put("/stocks/owned_stocks/" + key + ".json", data)
        .then(response => {
            console.log("PUT: Response from the database: ", response);
        })
        .catch(error => {
            console.error("PUT Request failed: ", error);
        });
}

// DELETE STOCK DATA FROM FIREBASE
export const deleteStockDataFromFirebase = (data) => {

    firebaseURL.delete("/stocks/owned_stocks/" + data.key + ".json")
        .then(response => {
            console.log("DELTE: Response from the database: ", response);
        })
        .catch(error => {
            console.error("DELETE Request failed: ", error);
        });
}

// GET STOCK DATA FROM DATABASE
export const getAllStockDataFromFirebase = async () => {
    
    let market = [];

    await firebaseURL.get("/stocks/owned_stocks.json")
        .then(response => {
            Object.keys(response.data).forEach(function (key) {
                console.log("KEY: " + key);
                console.log("data: ", response.data);
                market.push({ ...response.data[key], key })
            });
        })
        .catch(error => {
            console.log("Failed");
        });

    return market;
}

// GET SYMBOL DATA FROM DATABASE
export const getAllSymbolDataFromFirebase = async () => {
    
    let market = [];

    await firebaseURL.get("/stocks/symbols.json")
        .then(response => {
            Object.keys(response.data).forEach(function (key) {
                console.log("KEY: " + key);
                console.log("data: ", response.data);
                market.push({ ...response.data[key], key })
            });
        })
        .catch(error => {
            console.log("Failed");
        });

    return market;
}

// POST SYMBOL DATA TO FIREBASE
export const postSymbolDataToFirebase = async (data) => {

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