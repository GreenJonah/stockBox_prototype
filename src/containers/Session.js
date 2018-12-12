import React, { Component } from 'react';
import Portfolio from '../components/Portfolio/Portfolio';
import SearchBar from '../components/SearchBar/SearchBar';
import SessionSettings from '../components/SessionControls/SessionControls';
import Stocks from '../components/Stocks/Stocks';
import Viewport from '../components/Viewport/Viewport';
import Tools from '../components/Tools/Tools';
import BuyModal from '../components/Trading/Buy';
import SellModal from '../components/Trading/Sell';
import CreateModal from '../components/SaveLoad/SaveModal';
import LoadModal from '../components/SaveLoad/LoadModal';
import classes from './Session.css';
import * as apiServices from '../SharedServices/api-services';

class Session extends Component {


    state = {
        error: false,
        owned_stocks: [],
        symbols: [],
        portfolio: {
            portfolio_total: 0,
            buy_power: 0,
            stock_net: 0,
            returns: 0,
            gain_loss_data: {
                gain_loss: [],
                dates: []
            }
        },
        endDate: 0, 
        sessionDate: 0, 
        startDate: 0, 
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
        saveModal: false,
        loadModal: false,
        buySellQuantity: 0,
        allSessions: [],
        session: {
            name:'',
            key:''
        },
        not_owned_stock: false,
        BackgroundImage: "Search"
    };

    componentDidMount() {

        // INITIALY CHECK IF THE SESSION HAS EXPIRED USING THE SESSION START DATE,
        // IF IT IS BEFORE THE DATE OF A YEAR AGO TODAY, THEN THE SESSION HAS EXPIRED

        console.log("Session Key: ", localStorage.getItem("sessionKey"));

        if (localStorage.getItem("sessionKey")) {
            console.log("Yes");
            this.setState({sessionKey: localStorage.getItem("sessionKey")});
            apiServices.setNodeSessionKey(localStorage.getItem("sessionKey"));
            this.getInitialSessionData();
            
        } else {
            console.log("No");
            // Call a function to do this line let sessions = await.apiServices.getAllSessionNames();

            // Open up the create/load dialog, this would happen in the render function
            // we will probably need to create a jsx tag for both the two different pages, 
            // create/load dialog and the stock application itself
        }
    }

    getInitialSessionData = () => {
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

        apiServices.getSessionDates()
            .then(response => {
                console.log("Session Dates: ", response);
                this.setState({
                    sessionDate: response.sessionDate,
                    startDate: response.startDate,
                    endDate: response.endDate
                });
            })
            .catch(error => {
                this.setState({ error: true })
            });
        
        apiServices.getPortfolioData()
            .then(response => {
                console.log("Portfolio Data: ", response);
                if (response.gain_loss_data == null) {
                    let port = {
                        ...response
                    }
                    port.gain_loss_data = {
                        ...this.state.portfolio.gain_loss_data
                    }
                    console.log("Portfolio data: ", port);

                    this.setState({
                        portfolio: port
                    });
                } else {
                    this.setState({
                        portfolio: response
                    });
                }

                this.getPortfolioGraph();
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
        let gain_loss_data = {
            ...this.state.portfolio.gain_loss_data
        }

        let dates = [
            ...gain_loss_data.dates
        ]

        let gain_loss = [
            ...gain_loss_data.gain_loss
        ]
        console.log("Portfolio Data: ", dates, gain_loss);

        let graphColor = 'rgb(109, 160, 9)';
        if (gain_loss[gain_loss.length - 1] < 0)
            graphColor = '#ff3333'

        let graphData = gain_loss;
        let graphLabels =  dates;
        let graphLabel  = 'Porfolio';
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
        let graphLabel  = stock.symbol;
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
        let endDate = this.state.endDate;

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
                newSessionDate = endDate;
                break;
            default:
                break;
        }

        // The new session date cannot exceed the current date
        if (newSessionDate >= endDate)
            newSessionDate = endDate;

        // update data
        this.updateIntervalDataHandler(newSessionDate, this.state.sessionDate);
        console.log("FINISHED UPDATE INTVERAL HANDLER");

        this.setState({
            sessionDate: newSessionDate
        });
        let sessionDates = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            sessionDate: newSessionDate
        }
        apiServices.putSessionDates(sessionDates);
    }

    updateIntervalDataHandler = async (sessionDate, prevSessionDate) => {
        const owned = [
            ...this.state.owned_stocks
        ];

        let portfolio = {
            ...this.state.portfolio
        }

        if (owned.length > 0) {
            
            const startDate = this.state.startDate;
            const viewportStock = {
                ...this.state.viewport_stock
            }
            console.log("Fired 1");
            
            for (let i = 0; i < owned.length; i++) {

                let updatedStock = await apiServices.getChart(owned[i], startDate, sessionDate, owned[i].symbol);
                apiServices.putStockData(updatedStock);

                if (viewportStock.symbol == owned[i].symbol) {
                    console.log("updated Stock fired");
                    this.setState({viewport_stock: updatedStock});
                }
            }
            console.log("UPDATE INTVERAL DATA FINISHED");
        } 

        this.updatePorfolioData(portfolio, owned, prevSessionDate, sessionDate);
        this.updateViewPort();
    }

    updateViewPort = () => {
        // reset the graphs
        if (this.state.not_owned_stock){
            console.log("Fired");
            this.displayPortfolio();
        } else if (this.state.viewport_stock.symbol == "") {
            console.log("Super Fired");
            this.getPortfolioGraph();
        } else {
            console.log("Stock fired");
            this.getStockGraph(this.state.viewport_stock);
        }
    }

    intervalChangeHandler = (event) => {
        this.setState({interval: event.target.value});
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
                inputValue: term,
                BackgroundImage: "none"
            });
        } else {
            this.setState({
                filteredSymbols: [],
                inputValue: "",
                BackgroundImage: "Search"
            })
        }
    }

    stockChosen = async (symbol) => {

        this.setState({
            filteredSymbols: [],
            inputValue: "",
            BackgroundImage: "Search"
        });

        this.displayStock(symbol);
    }

    handleOpenModal = (event) => {
        switch (event.target.value) {
            case 'buy':
                this.setState({ buyModal: true });
                break;
            case 'sell':
                this.setState({sellModal: true});
                break;
            case 'save':
                this.setState({saveModal: true});
                break;
            case 'load':
                this.loadSessionNames();
                this.setState({loadModal: true});
                break;
            default:
            break;
        }
    }
    
    handleCloseModal = (event) => {
        switch (event.target.value) {
            case 'buy':
                this.setState({ buyModal: false });
                break;
            case 'sell':
                this.setState({sellModal: false});
                break;
            case 'save':
                this.setState({saveModal: false});
                break;
            case 'load':
                this.setState({loadModal: false});
                break;
            default:
            break;
        }
        this.setState({ 
            buySellQuantity: 0 });
    }

    loadSessionNames = async() => {
        let sessions = await apiServices.getAllSessionNames(); 
        console.log("sessions", sessions);

       this.setState({allSessions: sessions});
    }

    sessionChangeHandler = (event) => {
        this.setState({session: event.target.value});
    }

    loadSessionHandler = async () => {
        let sessions = await apiServices.getAllSessionNames();
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
        this.updatePorfolioData(portfolio, owned, this.state.sessionDate, this.state.sessionDate);
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
                
                // IF CASCADE, DELETING OR UPDATING STOCK
                if (remainingStockQuantity == 0) {
                    // delete stock from the database
                    apiServices.deleteStockData(owned[i]);
                    owned.splice(i, 1);
                    console.log("Owned stocks, ", owned);
                } else {
                    // update stock in database
                    apiServices.putStockData(owned[i]);
                    owned[i] = this.updateStockGainOrLoss(owned[i]);
                }
                this.setState({owned_stocks: owned});
                this.updatePorfolioData(portfolio, owned, this.state.sessionDate, this.state.sessionDate);

                // IF CASCADE, CHANGING VIEW PORT OPTIONS
                if (remainingStockQuantity == 0) {
                    this.displayPortfolio();
                } else {
                    this.updateViewPort();
                }
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

    updatePorfolioData = (portfolio, owned, sessionDate, newDate) => {

        console.log("owned length: " + owned.length);
        let stock_net = 0;
        let gain_loss = 0;
        for (let i = 0; i < owned.length; i++) {
            for (let t = 0; t < owned[i].purchasePrices.length; t++) {
                stock_net += Math.round(((parseFloat(owned[i].marketPrice) * parseFloat(owned[i].purchaseCounts[t]))) * 100) / 100; 
            }
            gain_loss += parseFloat(owned[i].gain_or_loss);
        }
        // Update current date if a sell happens
        if (sessionDate == newDate && portfolio.gain_loss_data.gain_loss.length > 0) {
            let len = portfolio.gain_loss_data.gain_loss.length - 1;
            portfolio.gain_loss_data.gain_loss[len] = gain_loss;
            console.log("Index: " + len + " gain or loss: " + gain_loss);
        } else if (sessionDate != newDate && portfolio.gain_loss_data.gain_loss.length == 0) {

            // Initialize todays date
            portfolio.gain_loss_data.gain_loss.push(0);
            console.log("New Date: " + (new Date(sessionDate).toString()).substring(4, 15) + " gain loss: " + 0);
            portfolio.gain_loss_data.dates.push((new Date(sessionDate).toString()).substring(4, 15));

            // Update new date
            portfolio.gain_loss_data.gain_loss.push(gain_loss);
            console.log("New Date: " + (new Date(newDate).toString()).substring(4, 15) + " gain loss: " + gain_loss);
            portfolio.gain_loss_data.dates.push((new Date(newDate).toString()).substring(4, 15));
        } else {
            portfolio.gain_loss_data.gain_loss.push(gain_loss);
            console.log("New Date: " + (new Date(newDate).toString()).substring(4, 15) + " gain loss: " + gain_loss);
            portfolio.gain_loss_data.dates.push((new Date(newDate).toString()).substring(4, 15));
        }
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
                searchStyle={this.state.BackgroundImage}
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
                        gain_loss={this.state.portfolio.gain_loss_data.gain_loss}
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
                        not_owned={this.state.not_owned_stock}
                        openModal={this.handleOpenModal}
                    />
                    <BuyModal
                        showModal={this.state.buyModal}
                        purchased={this.purchasedStock}
                        handleCloseModal={this.handleCloseModal}
                        stock={this.state.viewport_stock}
                        buy_power={this.state.portfolio.buy_power}
                        buyQuantity={this.state.buySellQuantity}
                        changeQuantity={this.quantityChangeHandler}
                        marketPrice={this.state.viewport_stock.marketPrice}
                    />
                    <SellModal
                        showModal={this.state.sellModal}
                        sold={this.soldStock}
                        handleCloseModal={this.handleCloseModal}
                        stock={this.state.viewport_stock}
                        sellQuantity={this.state.buySellQuantity}
                        changeQuantity={this.quantityChangeHandler}
                        marketPrice={this.state.viewport_stock.marketPrice}
                    />
                    <CreateModal
                        showModal={this.state.saveModal}
                        handleCloseModal={this.handleCloseModal}
                    />
                    <LoadModal
                        showModal={this.state.loadModal}
                        handleCloseModal={this.handleCloseModal}
                        loadSessionNames={this.loadSessionNames}
                        allSessions={this.state.allSessions}
                        session={this.state.session}
                        sessionSelected={this.sessionChangeHandler}
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
                        endDate={this.state.endDate}
                        interval={this.state.interval}
                        next={this.dateChangeHandler}
                        intervalChange={this.intervalChangeHandler} 
                        openModal={this.handleOpenModal}
                    />
                </div>
            </div>
        );
    }
}

export default Session;