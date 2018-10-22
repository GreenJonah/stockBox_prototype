import React, {Component} from 'react';
import axios from '../axios-orders';
import Portfolio from '../components/Portfolio/Portfolio';
import SearchBar from '../components/SearchBar/SearchBar';
import SessionSettings from '../components/SessionControls/SessionControls';
import Stocks from '../components/Stocks/Stocks';
import Viewport from '../components/Viewport/Viewport';
import Tools from '../components/Tools/Tools';
import classes from './Session.css';

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
        error: false,
        owned_stocks: null,
        market_stocks: null,
        owned_stock_count: 0,
        viewport_stock: {
            symbol: "",
            purchasePrice: 0,
            gain_or_loss: 0,
            marketPrice: 0
        },
        graph_data: "Portfolio",
        portfolio: 950,
        buyPower: 600,
        stockNet: 350,
        percent: -5,
        gain_loss: -50,
        logo: "NA",
        sessionDate: { month: 'July', day: 20, year: 2010 },
        startDate: { month: 'July', day: 20, year: 2010 }
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
        this.setState({graph_data: stock.symbol});

        axios.get("/stock/" + symbol + "/logo")
            .then(response => {
                this.setState({logo: response.data.url});
                console.log(response.data);
            })
            .catch(error => {
                this.setState({error: true})
            });
    };

    displayPortfolio = () => {

        let obj = {
            symbol: "",
            purchasePrice: 0,
            gain_or_loss: 0,
            marketPrice: 0
        };
        this.setState({viewport_stock: obj});
        this.setState({graph_data: "Portfolio"});

        console.log("The sybmol is: " + this.state.viewport_stock.symbol);
    };

    dateChangeHandler = (newDate) => {
        console.log('session date was updated');
        this.setState( {
            sessionDate: { month: 'May', day: 22, year: 2012 }
        } )
    }

    render() {
        let stocks = <p>Data Cannot be loaded</p>;
        if (this.state.market_stocks) {
            stocks = <Stocks
                stockDisplayed={this.displayStock}
                market_stocks={this.state.market_stocks}
            />
        }

        return (
           <div className={classes.wrapper}>
               <div className={classes.search}><SearchBar/></div>
               <div className={classes.port}> 
                <Portfolio
                    portfolio={this.state.portfolio}
                    buyPower={this.state.buyPower}
                    stockNet={this.state.stockNet}
                    percent={this.state.percent}
                    gain_loss={this.state.gain_loss}
                />
                </div>
                <div className={classes.tool}>
                    <Tools/>
                </div>
                <div className={classes.view}>
                <Viewport
                   symbol={this.state.viewport_stock.symbol}
                   purchasePrice={this.state.viewport_stock.purchasePrice}
                   marketPrice={this.state.viewport_stock.marketPrice}
                   gain_or_loss={this.state.viewport_stock.gain_or_loss}
                   graph_data={this.state.graph_data}
                   display_porfolio={() => this.displayPortfolio()}
                   logo={this.state.logo}
                />
                </div>
                <div className={classes.stock}>{stocks}</div>
                <div className={classes.session}>
                    <SessionSettings 
                        className={classes.session} 
                        sessionDate={this.state.sessionDate}
                        startDate={this.state.startDate}
                        next={this.dateChangeHandler}/>
                </div>
           </div>
        );
    }
}

export default Session;