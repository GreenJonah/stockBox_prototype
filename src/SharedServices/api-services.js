import axios from '../axios-service';
import  * as http from './http-services';


// *************** DATABASE API CALLS ******************

// POST STOCK DATA
export const postStockData = async (data) => {
    return await http.post("api/postNewStock", data);
}

// // POST SYMBOL DATA
export const postSymbolData= async (data) => {
    return await http.post("api/postNewSymbol", data);
}

// PUT STOCK DATA 
export const putStockData = async (data) => {
    await http.put("api/putStockData", data);
}

// DELETE STOCK DATA
export const deleteStockData = async (data) => {
    await http.del("api/deleteStockData/" + data.key);
}

// GET ALL STOCK DATA
export const getAllStockData = async () => {    
   return await http.get("api/getAllStockData");
}

// GET SYMBOL DATA FROM DATABASE
export const getAllSymbolData = async () => {
    return await http.get("api/getAllSymbolData");
}

// *************** STOCK API CALLS ******************

// GET STOCK LOGO
export const getStockLogo = async (data) => {
    return await http.get("api/getStockLogo/" + data);
}

// STOCK API CALLS
// Get a stock when clicked on the search bar, using the stock date and timestamp: GET ONE
// GET a stock by date AND timestamp of the session, getting the market close price  // When session is changed, update all owned stocks


// let symbol = this.state.owned_stocks[1].owned_stock.symbol;
        // axios.get('/stock/' + symbol + '/quote')
        //     .then(response => {
        //         this.setState({market_stock: response.data});
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });

// import { iextradingURL } from '../axios-service';

// // POST STOCK DATA TO FIREBASE
// export const postStockDataToFirebase = async (data) => {

//         let newData = null;
    
//         await firebaseURL.post("/stocks/owned_stocks.json", data)
//             .then(response => {
//                 console.log("POST: Response from the database: ", response);
//                 let key = response.data.name;
//                 newData = { ...data, key };
//             })
//             .catch(error => {
//                 console.error("POST Request failed: ", error);
//             });
    
//         // Need to return new post with key
//         // async getPostValue () {
//         //     let newStock = await FirebaseServices.postDateToFirebase();
//         //     console.log("NEW STOCK: ", newStock);
//         //     return newStock;
//         // }
//         return newData;
//     }