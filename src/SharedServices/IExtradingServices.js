// let symbol = this.state.owned_stocks[1].owned_stock.symbol;
        // axios.get('/stock/' + symbol + '/quote')
        //     .then(response => {
        //         this.setState({market_stock: response.data});
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });

// STOCK API CALLS
// Get a stock when clicked on the search bar, using the stock date and timestamp
// GET a stock by date AND timestamp of the session, getting the market close price

// When session is changed, update all owned stocks
// Get stock data from start date of session to current session date 

import { iextradingURL } from '../axios-service';

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