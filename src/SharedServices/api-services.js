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

// GET STOCK FROM A SINGLE DATE
export const getStockDataFromDate = async (owned_stock, dateMill, key) => {

    var d = new Date("Fri Nov 9 2018 00:00:00");

    console.log("Timestamp: ", d);

    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();

    if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

    let fullDate = year + "" + month + "" + day;
    let url = key + "/" + fullDate;

    console.log("year: " + year + " month: " + month + " day: " + day + " final: " + url);

    let formattedData = {};

    await http.get("api/getStockFromDate/" + url)
        .then(response => {
            if (owned_stock == null) {
                formattedData = {
                    change: 0,
                    changePercent: 0,
                    gain_or_loss: 0,
                    historical: [],
                    logo: null,
                    marketPrice: response.marketClose,
                    purchaseCount: 0,
                    purchasePrice: 0,
                    symbol: key
                };
            } else {
                // create new historical spot
                // update values
                const his = {
                    marketPrice: owned_stock.marketPrice,
                    date: 'Nov 17'
                }
                owned_stock.historical.push(his);
                owned_stock.marketPrice
            }
            console.log("Formatted data: ", formattedData);
        })
        .catch(error => {
           
        });

    return formattedData;
}

// GET STOCK LOGO
export const getStockLogo = async (key) => {
    return await http.get("api/getStockLogo/" + key);
}

// THIS WILL BE DELETED SINCE WE ARE NO LONGER USING 5Y CHARTS, BUT JUST SO IT WON'T ERROR OUT WHEN CALLED IT GOES HERE
export const getChart = async (key) => {
    return await http.get("api/getChart/" + key);
}

// STOCK API CALLS
// Get a stock when clicked on the search bar, using the stock date and timestamp: GET ONE
// GET a stock by date AND timestamp of the session, getting the market close price  // When session is changed, update all owned stocks