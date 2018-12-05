import React, { Component } from 'react';
import Portfolio from '../components/Portfolio/Portfolio';
import SearchBar from '../components/SearchBar/SearchBar';
import SessionSettings from '../components/SessionControls/SessionControls';
import Stocks from '../components/Stocks/Stocks';
import Viewport from '../components/Viewport/Viewport';
import Tools from '../components/Tools/Tools';
import BuyModal from '../components/Trading/Buy';
import SellModal from '../components/Trading/Sell';
import classes from './Session.css';
import * as apiServices from '../SharedServices/api-services';

class Session extends Component {


    state = {
        error: false,
        owned_stocks: [],
        sessionKey: 0,
        symbols: [],
        portfolio: {
            portfolio_total: 1000,
            buy_power: 1000,
            stock_net: 0,
            returns: 0,
            gain_loss: 0
        },
        endDate: 1536904800000, // Sep 14th, 2018
        sessionDate: 1528956000000, 
        startDate: 1528956000000,   // June 15, 2018
        filteredSymbols: [],
        inputValue: "",
        viewport_stock: {
            symbol: "",
            gain_or_loss: 0,
            marketPrice: 0
        },
        graph_data: "Portfolio",
        logo: "NA",
        interval: "day",
        stockGraph:{},
        portfolioGraph:{},
        buyModal: false,
        sellModal: false,
        buySellQuantity: 0,
        not_owned_stock: false
    };

    componentDidMount() {

        // INITIALY CHECK IF THE SESSION HAS EXPIRED USING THE SESSION START DATE,
        // IF IT IS BEFORE THE DATE OF A YEAR AGO TODAY, THEN THE SESSION HAS EXPIRED

        console.log("Session Key: ", localStorage.getItem("sessionKey"));

        if (localStorage.getItem("sessionKey")) {
            console.log("Yes");
            this.setState({sessionKey: localStorage.getItem("sessionKey")});
            apiServices.setNodeSessionKey(localStorage.getItem("sessionKey"));
            this.getInitialStockData();
            
        } else {
            console.log("No")
            // Open up the create/load dialog, this would happen in the render function
            // we will probably need to create a jsx tag for both the two different pages, 
            // create/load dialog and the stock application itself
        }
    }

    getInitialStockData = () => {
        apiServices.getAllStockData()
            .then(response => {
                console.log("MARKET data: ", response);
                this.setState({
                    owned_stocks: response
                });
            })
            .catch(error => {
                this.setState({ error: true })
            });

        apiServices.getAllSymbolData()
            .then(response => {
                console.log("SYMBOL Data: ", response);
                this.setState({
                    symbols: response
                });
            })
            .catch(error => {
                this.setState({ error: true })
            });
    }

    displayStock = async (symbol) => {

        const owned = [
            ...this.state.owned_stocks
        ];
        
        let stock = null;
        let found = false;
        for (let i = 0; i < owned.length; i++) {
            if (owned[i].symbol === symbol) {
                found = true;
                stock = owned[i];
                this.setState({not_owned_stock: false});
            }
        }

        // IF STOCK WAS NOT FOUND FROM STATE, THEN PULL FROM API
        if (!found) {
            await apiServices.getChart(null, this.state.startDate, this.state.sessionDate, symbol)
            .then(res => {
                console.log("New Stock: ", res);
                stock = res;
                this.setState({not_owned_stock: true});
            })
        }

        console.log("Display Stock: ", stock);

        this.setState({ viewport_stock: stock});
        this.setState({ graph_data: stock.symbol });
        this.setState({ logo: stock.logo});
        this.getStockGraph(stock);
    };

    componentWillMount = () => {
        this.getPortfolioGraph();
    } 

    makeGraph = (graphColor, graphData, graphLabels, graphLabel) => {    
        let graph = {
                labels: graphLabels,
                datasets:[
                {
                    label:graphLabel,
                    data: graphData,
                    backgroundColor: graphColor,
                    borderColor: 'rgb(0, 0, 0)',
                    borderWidth: 2,
                    lineTension: 0,
                    pointHitRadius: 12,
                    pointHoverRadius: 5,
                    pointRadius: 1,
                    fill: 'start'
                }
                ]
            }
        return graph;
    }

    getPortfolioGraph = () => {
        // set the graphs variables and call makeGraph
        let graphColor = 'rgb(109, 160, 9)';
        if (this.state.gain_loss < 0)
            graphColor = '#ff3333'
        
        let graphData = [
            60, 
            85,
            45,
            21,
            5,
            -50
        ]; 
        let graphLabel  = 'Gains/Losses';
        let graphLabels =  ['January', 'Febuary', 'March', 'April', 'May', 'June'];
        let graph = this.makeGraph(graphColor, graphData, graphLabels, graphLabel);
        this.setState({ portfolioGraph: graph});
       
    }

    getStockGraph = (stock) => {

        let dates = [
            ...stock.historical.dates
        ]
        let stockData = [
            ...stock.historical.stockData
        ]
       
        // set the graphs variables and call make graph
        let graphColor = 'rgb(109, 160, 9)';
        if (stock.change < 0)
            graphColor = '#ff3333'

        let graphData = stockData; 
        let graphLabel  = '3 months';
        let graphLabels =  dates;
        let graph = this.makeGraph(graphColor, graphData, graphLabels, graphLabel);
        this.setState({ stockGraph: graph});
    }

    displayPortfolio = () => {

        let obj = {
            symbol: "",
            gain_or_loss: 0,
            marketPrice: 0
        };
        this.setState({ viewport_stock: obj });
        this.setState({not_owned_stock: false});
        this.setState({ graph_data: "Portfolio" });
        this.getPortfolioGraph();
        
        console.log("The sybmol is: " + this.state.viewport_stock.symbol);
    };

    dateChangeHandler = () => {
        let newSessionDate = this.state.sessionDate;
        let currentDate = new Date().getTime();

        switch (this.state.interval) {
            case "day":
                newSessionDate += 86400000;
                break;
            case "week":
                newSessionDate += 604800000;
                break;
            case "month":
                newSessionDate += 2.6280E+9;
                break;
            case "year":
                newSessionDate += 3.1536E+10;
                break;
            case "finish":
                newSessionDate = currentDate;
                break;
            default:
                break;
        }

        // The new session date cannot exceed the current date
        if (newSessionDate >= currentDate)
            newSessionDate = currentDate;

        this.setState({
            sessionDate: newSessionDate
        });
       
        // update data
        this.updateIntervalDataHandler(newSessionDate);
        console.log("FINISHED UPDATE INTVERAL HANDLER");
    }

    updateIntervalDataHandler = async (sessionDate) => {
        const owned = [
            ...this.state.owned_stocks
        ];

        if (owned.length > 0) {
            let portfolio = {
                ...this.state.portfolio
            }
            const startDate = this.state.startDate;
            const viewportStock = this.state.viewport_stock;
            
            for (let i = 0; i < owned.length; i++) {

                let updatedStock = await apiServices.getChart(owned[i], startDate, sessionDate, owned[i].symbol);
                apiServices.putStockData(updatedStock);

                if (viewportStock.symbol == owned[i].symbol) {
                    this.setState({viewport_stock: updatedStock});
                }
            }
            this.updatePorfolioData(portfolio, owned);
            console.log("UPDATE INTVERAL DATA FINISHED");
            // reset the graphs
            this.getPortfolioGraph();
            this.getStockGraph(this.state.viewport_stock);
        } 
        
        if (this.state.not_owned_stock){
            console.log("Fired");
            this.displayPortfolio();
        }
    }

    intervalChangeHandler = (event) => {
        this.setState({
            interval: event.target.value
        });
    }

    filterStock = (event) => {

        if (event.target.value) {
            const term = event.target.value;
            const symbols = [
                ...this.state.symbols
            ]

            let filteredArray = symbols.filter(
                symbol => symbol.symbol.toLowerCase().includes(term.toLowerCase())
            );

            this.setState({
                filteredSymbols: filteredArray,
                inputValue: term
            });
        } else {
            this.setState({
                filteredSymbols: [],
                inputValue: ""
            })
        }
    }

    stockChosen = async (symbol) => {

        this.setState({
            filteredSymbols: [],
            inputValue: ""
        });

        this.displayStock(symbol);
    }

    handleOpenModal = (event) => {
        let action = event.target.value;
        if (action === 'buy')
            this.setState({ buyModal: true });
        if (action === 'sell')
            this.setState({sellModal: true});
    }
    
    handleCloseModal = (event) => {
        let action = event.target.value;
        if (action === 'buy')
            this.setState({ buyModal: false });
        if (action === 'sell')
            this.setState({sellModal: false });
       
        this.setState({ 
            buySellQuantity: 0 });
    }

    purchasedStock = async (symbol, event) => {
        console.log("Symbol: ", symbol);

        let quantity = this.state.buySellQuantity;
        this.handleCloseModal(event);

        let portfolio = {
            ...this.state.portfolio
        }

        let owned = null;

        // If we don't own the stock currently
        if (this.state.not_owned_stock) {
            console.log("Fired");
            let stock = {
                ...this.state.viewport_stock
            }

            stock.purchaseCounts.push(quantity);
            stock.purchasePrices.push(stock.marketPrice);
            portfolio.buy_power -= Math.round((parseFloat(quantity) * parseFloat(stock.marketPrice)) * 100) / 100;

            console.log("Add new stock: ", owned);
            let newStock = await apiServices.postStockData(stock);

            owned = [
                ...this.state.owned_stocks,
                newStock
            ];

            this.setState({not_owned_stock: false});
            this.setState({owned_stocks: owned});
        } else {
            console.log("Purchased same stock");
            owned = [
                ...this.state.owned_stocks
            ];
            
            for (let i = 0; i < owned.length; i++) {
                if (owned[i].symbol === symbol) {
                    owned[i].purchaseCounts.push(quantity);
                    owned[i].purchasePrices.push(owned[i].marketPrice);
                    portfolio.buy_power -=  Math.round((parseFloat(quantity) * parseFloat(owned[i].marketPrice)) * 100) / 100;
                    apiServices.putStockData(owned[i]);
                    this.setState({owned_stocks: owned});
                    break;
                }
            }
        } 
        console.log("Onwed: ", owned);
        this.updatePorfolioData(portfolio, owned);
    }

    soldStock = async (symbol, event) => {
        console.log("Symbol: ", symbol);

        let quantity = parseFloat(this.state.buySellQuantity);
        this.handleCloseModal(event);

        let owned = [
            ...this.state.owned_stocks
        ];
        
        for (let i = 0; i < owned.length; i++) {
            if (owned[i].symbol === symbol) {
  
                let portfolio = {
                    ...this.state.portfolio
                }

                let remainingStockQuantity = 0;
                for (let t = 0; t < owned[i].purchaseCounts.length; t++) {

                    if (quantity > 0) {
                        
                        let soldQuantity = 0;

                        // Use Quantity if it is less
                        if (quantity < parseFloat(owned[i].purchaseCounts[t])) {
                            soldQuantity = quantity;
                            owned[i].purchaseCounts[t] -= soldQuantity;
                        } else {
                            soldQuantity = parseFloat(owned[i].purchaseCounts[t])
                            owned[i].purchaseCounts[t] = 0;
                        }
                        portfolio.buy_power += Math.round((parseFloat(owned[i].marketPrice) * parseFloat(soldQuantity)) * 100) / 100; 
                        quantity = quantity - soldQuantity;
                       
                    } 
                    remainingStockQuantity += parseFloat(owned[i].purchaseCounts[t])
                    console.log("remaining: " + remainingStockQuantity);
                }
                
                if (remainingStockQuantity == 0) {
                    // delete stock from the database
                    apiServices.deleteStockData(owned[i]);
                    owned.splice(i, 1);
                    this.displayPortfolio();
                    console.log("Owned stocks, ", owned);
                } else {
                    // update stock in database
                    apiServices.putStockData(owned[i]);
                    owned[i] = this.updateStockGainOrLoss(owned[i]);
                    this.displayStock(symbol);
                }
                this.setState({owned_stocks: owned});
                this.updatePorfolioData(portfolio, owned);
            }
        }
    }

    updateStockGainOrLoss = (stock) => {
        let total_gains_losses = 0;
        for (let i = 0; i < stock.purchasePrices.length; i++) {
            total_gains_losses += Math.round(((parseFloat(stock.marketPrice) - parseFloat(stock.purchasePrices[i])) * stock.purchaseCounts[i]) * 100) / 100; 
        }
        stock.gain_or_loss = total_gains_losses;

        return stock;
    }

    updatePorfolioData = (portfolio, owned) => {

        console.log("owned length: " + owned.length);
        let stock_net = 0;
        let gain_loss = 0;
        for (let i = 0; i < owned.length; i++) {
            for (let t = 0; t < owned[i].purchasePrices.length; t++) {
                stock_net += Math.round(((parseFloat(owned[i].marketPrice) * parseFloat(owned[i].purchaseCounts[t]))) * 100) / 100; 
            }
            gain_loss += parseFloat(owned[i].gain_or_loss);
        }
        portfolio.gain_loss = gain_loss;
        portfolio.stock_net = stock_net;
        portfolio.portfolio_total = stock_net + portfolio.buy_power;
        if (gain_loss != 0) {
            portfolio.returns = gain_loss / stock_net;
        } else {
            portfolio.returns = 0;
        }

        this.setState({portfolio: portfolio});
        apiServices.putPorfolioData(portfolio);
    }

    quantityChangeHandler = (event) => {
        let tempQuantity = this.state.buySellQuantity;
        if (event.target.value === '+')
            tempQuantity++;
        else if (event.target.value === '-' && tempQuantity !== 0)
            tempQuantity--;
        else if (!isNaN(event.target.value))
            tempQuantity = event.target.value;
        this.setState({
            buySellQuantity: tempQuantity
        });
    }

    render() {
        let searchBar = <p>Loading Search Bar</p>;

        if (this.state.symbols) {
            searchBar = <SearchBar
                value={this.state.inputValue}
                chooseStock = {this.stockChosen}
                typeStock = {this.filterStock}
                filteredList = {this.state.filteredSymbols}
            />
        }

        return (
            <div className={classes.wrapper}>
                <div className={classes.search}>{searchBar}</div>
                <div className={classes.port}>
                    <Portfolio
                        portfolio={this.state.portfolio.portfolio_total}
                        buyPower={this.state.portfolio.buy_power}
                        stockNet={this.state.portfolio.stock_net}
                        percent={this.state.portfolio.returns}
                        gain_loss={this.state.portfolio.gain_loss}
                    />
                </div>
                <div className={classes.tool}>
                    <Tools />
                </div>
                <div className={classes.view}>
                    <Viewport
                        symbol={this.state.viewport_stock.symbol}
                        marketPrice={this.state.viewport_stock.marketPrice}
                        gain_or_loss={this.state.viewport_stock.gain_or_loss}
                        graph_data={this.state.graph_data}
                        portfolioGraph={this.state.portfolioGraph}
                        stockGraph={this.state.stockGraph}
                        display_porfolio={() => this.displayPortfolio()}
                        logo={this.state.logo}
                        openBuyModal={this.handleOpenModal}
                        openSellModal={this.handleOpenModal}
                    />
                    <BuyModal
                        showModal={this.state.buyModal}
                        purchased={this.purchasedStock}
                        handleCloseModal={this.handleCloseModal}
                        stock={this.state.viewport_stock.symbol}
                        buyQuantity={this.state.buySellQuantity}
                        changeQuantity={this.quantityChangeHandler}
                        marketPrice={this.state.viewport_stock.marketPrice}
                    />
                    <SellModal
                        showModal={this.state.sellModal}
                        sold={this.soldStock}
                        handleCloseModal={this.handleCloseModal}
                        stock={this.state.viewport_stock.symbol}
                        sellQuantity={this.state.buySellQuantity}
                        changeQuantity={this.quantityChangeHandler}
                        marketPrice={this.state.viewport_stock.marketPrice}
                    />
                    
                    
                </div>
                <div className={classes.stock}>{
                    <Stocks
                        stockDisplayed={this.displayStock}
                        owned_stocks={this.state.owned_stocks}
                    />
                }</div>
                <div className={classes.session}>
                    <SessionSettings
                        className={classes.session}
                        sessionDate={this.state.sessionDate}
                        startDate={this.state.startDate}
                        interval={this.state.interval}
                        next={this.dateChangeHandler}
                        intervalChange={this.intervalChangeHandler} />
                </div>
            </div>
        );
    }
}

export default Session;