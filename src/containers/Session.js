import React, {Component} from 'react';
import axios from '../axios-orders';
import Aux from '../hoc/Auxx';
import Portfolio from '../components/Portfolio/Portfolio';
import SearchBar from '../components/SearchBar/SearchBar';
import SessionSettings from '../components/SessionControls/SessionControls';
import Stocks from '../components/Stocks/Stocks';
import Viewport from '../components/Viewport/Viewport'

class Session extends Component {

    // OUR OWNED STOCK OBJECTS WILL LOOK LIKE THIS
    // owned_stock: {
    //     symbol: "aapl",
    //     purchase_price: 160,
    //     gain_or_loss: 8
    // }

    // OUR MARKET STOCK OBJECTS WILL LOOK LIKE THIS
    // market_stock: {
    //     symbol: "aapl",
    //     latestPrice: 168.35,
    //     changePercent: 0.01026,
    //     change: 1.71,     // Change in dollars
    // }

    state = {
        owned_stocks: null,
        market_stocks: null,
        owned_stock_count: 0,
        viewport_stock: {
            symbol: "",
            purchasePrice: 0,
            gain_or_loss: 0,
            marketPrice: 0
        }
    };

    displayStock = (symbol) => {
        console.log(this.state.market_stocks);
        console.log(this.state.owned_stocks);
        console.log(symbol);

        let stock = null;
        const owned = this.state.owned_stocks;
        for (let i = 0; i < owned.length; i++) {
            if (owned[i].symbol === symbol) {
                stock = owned[i];
            }
        }
        console.log(stock);

        this.setState({viewport_stock: stock});
    };

    componentDidMount() {
        // let symbol = this.state.owned_stocks[1].owned_stock.symbol;
        // axios.get('/stock/' + symbol + '/quote')
        //     .then(response => {
        //         this.setState({market_stock: response.data});
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });

        axios.get("https://stock-box-prototype.firebaseio.com/stocks.json")
            .then(response => {
                let market = [];
                let owned = [];

                Object.keys(response.data.market_stocks).forEach(function(key) {
                    market.push(response.data.market_stocks[key])
                });

                Object.keys(response.data.owned_stocks).forEach(function(key) {
                    owned.push(response.data.owned_stocks[key])
                });

                this.setState({
                    market_stocks: market, owned_stocks: owned
                });
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

    render() {
        let stocks = <p>Data Cannot be loaded</p>;
        if (this.state.market_stocks) {
            stocks = <Stocks
                stockDisplayed={this.displayStock}
                market_stocks={this.state.market_stocks}
            />
        }
        let graph = "Porfolio GRAPH";
        if (this.state.viewport_stock.symbol !== "") {
            graph = this.state.viewport_stock.symbol + " Graph";
        }

        return (
           <Aux>
               <Portfolio/>
               <SearchBar/>
               <Viewport
                   symbol={this.state.viewport_stock.symbol}
                   purchasePrice={this.state.viewport_stock.purchasePrice}
                   marketPrice={this.state.viewport_stock.marketPrice}
                   gain_or_loss={this.state.viewport_stock.gain_or_loss}
                   graph_type={graph}
               />
               <SessionSettings/>
               {stocks}
               {/*<Tools/>*/}
           </Aux>
        );
    }
}

export default Session;