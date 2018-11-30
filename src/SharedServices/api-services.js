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

// GET STOCK CHART DATA
export const getChart = async (owned_stock, startDate, sessionDate, key) => {

    let formattedData = {};
    let logo = null;

    if (owned_stock == null) {
        logo = await getStockLogo(key);
    }

    console.log("logo: ", logo);

    await http.get("api/getChart/" + key)
        .then(response => {

            let stock = null;
            const stockHistory = response;
            let dates = [];
            let stockData = [];

            // Set the past month of data but stop before the session date
            for(let i = 0; i < stockHistory.length; i++)
            {
                let date = new Date(stockHistory[i].date);
                let millTime = date.getTime();
                if (millTime >= startDate && millTime <= sessionDate)
                {
                    dates.push(stockHistory[i].label);
                    stockData.push(stockHistory[i].close);
                }
                else if (millTime > sessionDate)   
                {
                    stock = stockHistory[i - 1];
                    console.log("FIRED!!!!!!!!!!!!!!!!!!!!!! " + dates[stockData.length - 1]);
                    break;
                }
            }

            console.log("Stock, ", stock);

            // Brand new stock
            if (owned_stock == null) 
            {
                formattedData = {
                    change: stock.change,
                    changePercent: stock.changePercent,
                    gain_or_loss: 0,
                    historical: {
                        dates: dates,
                        stockData: stockData
                    },
                    logo: logo,
                    marketPrice: stock.close,
                    purchaseCount: 0,
                    purchasePrice: 0,
                    symbol: key
                };
            }
            //  Existing Stock
            else 
            {
                let gain_or_loss = stock.close - owned_stock.purchasePrice;
                owned_stock.gain_or_loss = gain_or_loss;
                owned_stock.marketClose = stock.close;
                owned_stock.historical = {
                    dates: dates,
                    stockData: stockData
                }
                owned_stock.changePercent = stock.changePercent;
                owned_stock.change = stock.change;
            }
            
            console.log("Formatted data: ", formattedData);
        })
        .catch(error => {
           console.log("Failed to get chart");
        });

    return formattedData;
}

// GET STOCK LOGO
export const getStockLogo = async (key) => {
    return await http.get("api/getStockLogo/" + key);
}