import  * as http from './http-services';

// ****** SET BACKEND LOCAL STORAGE SESSION KEY ********

export const setNodeSessionKey = async (sessionKey) => {
    return await http.get("api/setSessionKey" + sessionKey);
}

// *************** DATABASE API CALLS ******************

// POST NEW SESSION
export const postNewSession = async (data) => {
    return await http.post("api/postNewSession", data);
}

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

// PUT STOCK DATA 
export const putSessionDates = async (data) => {
    await http.put("api/putSessionDates", data);
}

// PUT PORFOLIO DATA 
export const putPorfolioData = async (data) => {
    await http.put("api/putPortfolioData", data);
}

// DELETE STOCK DATA
export const deleteStockData = async (data) => {
    await http.del("api/deleteStockData/" + data.key);
}

// GET ALL STOCK DATA
export const getAllStockData = async () => {    
   return await http.get("api/getAllStockData");
}

// GET SESSION DATES
export const getSessionDates = async () => {    
    return await http.get("api/getSessionDates");
}

// GET PORTFOLIO DATA
 export const getPortfolioData = async () => {    
    return await http.get("api/getPortfolioData");
 }

// GET SYMBOL DATA FROM DATABASE
export const getAllSymbolData = async () => {
    return await http.get("api/getAllSymbolData");
}

// GET SESSION NAMES FROM DATABASE
export const getAllSessionNames = async () => {
    return await http.get("api/getAllSessionNames");
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
                let date = new Date(stockHistory[i].label);
                let millTime = date.getTime();
                // console.log("Date " + date + " Mill time: ", millTime + "  startDate: " + startDate + " sessionDate: " + sessionDate);
                if (millTime >= startDate && millTime <= sessionDate)
                {
                    dates.push(stockHistory[i].label);
                    stockData.push(stockHistory[i].close);
                }
                
                if (millTime > sessionDate || (stockHistory.length - 1) == i)   
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
                    purchaseCounts: [],
                    purchasePrices: [],
                    symbol: key
                };
            }
            //  Existing Stock
            else 
            {
                let total_gains_losses = 0;
                for (var i = 0; i < owned_stock.purchasePrices.length; i++) {
                    total_gains_losses += Math.round(((parseFloat(stock.close) - parseFloat(owned_stock.purchasePrices[i])) * owned_stock.purchaseCounts[i]) * 100) / 100; 
                }
                owned_stock.gain_or_loss = total_gains_losses;
                owned_stock.marketPrice = stock.close;
                owned_stock.historical = {
                    dates: dates,
                    stockData: stockData
                }
                owned_stock.changePercent = stock.changePercent;
                owned_stock.change = stock.change;

                formattedData = owned_stock;
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