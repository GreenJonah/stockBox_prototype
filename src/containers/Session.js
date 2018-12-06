import React, { Component } from 'react';
import Portfolio from '../components/Portfolio/Portfolio';
import SearchBar from '../components/SearchBar/SearchBar';
import SessionSettings from '../components/SessionControls/SessionControls';
import Stocks from '../components/Stocks/Stocks';
import axios from 'axios';
import Viewport from '../components/Viewport/Viewport';
import Tools from '../components/Tools/Tools';
import BuyModal from '../components/Trading/Buy';
import SellModal from '../components/Trading/Sell';
import CreateModal from '../components/SaveLoad/SaveModal';
import LoadModal from '../components/SaveLoad/LoadModal';
import classes from './Session.css';
import * as apiServices from '../SharedServices/api-services';

class Session extends Component {


    // OUR OWNED STOCK OBJECTS WILL LOOK LIKE THIS
    // owned_stock: {
    //     symbol: "aapl",
    //     purchasePrice: 160,
    //     purhcaseCount: 3,
    //     gain_or_loss: 8,
    //     marketPrice, 168
    //     changePercent: 0.01026,
    //     change: 1.71,
    //     logo: "https://storage.googleapis.com/iex/api/logos/AAPL.png"
    //     historical: [
    //          dates: [],
    //          stockData: []                   
    //     ]
    // }

    state = {
        error: false,
        owned_stocks: null,
        symbols: null,
        filteredSymbols: [],
        inputValue: "",
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
        sessionDate: 1536904800000, // Sep 14, 2018
        startDate: 1529042400000,   // June 15, 2018
        interval: "hour",
        stockGraph:null,
        portfolioGraph:null,
        buyModal: false,
        sellModal: false,
        saveModal: false,
        loadModal: false,
        buySellQuantity: 0
    };

    componentDidMount() {

        // INITIALY CHECK IF THE SESSION HAS EXPIRED USING THE SESSION START DATE,
        // IF IT IS BEFORE THE DATE OF A YEAR AGO TODAY, THEN THE SESSION HAS EXPIRED

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
            }
        }

        // IF STOCK WAS NOT FOUND FROM STATE, THEN PULL FROM API
        if (!found) {
            await apiServices.getChart(null, this.state.startDate, this.state.sessionDate, symbol)
            .then(res => {
                console.log("New Stock: ", res);
                stock = res;
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
        if ( this.state.viewport_stock.gain_or_loss < 0 )
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
            purchasePrice: 0,
            gain_or_loss: 0,
            marketPrice: 0
        };
        this.setState({ viewport_stock: obj });
        this.setState({ graph_data: "Portfolio" });
        this.getPortfolioGraph();
        
        console.log("The sybmol is: " + this.state.viewport_stock.symbol);
    };

    dateChangeHandler = () => {
        let newSessionDate = this.state.sessionDate;
        let currentDate = new Date().getTime();

        switch (this.state.interval) {
            case "hour":
                newSessionDate += 3600000;
                break;
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
        // reset the graphs
        this.getPortfolioGraph();
        this.getStockGraph(this.state.viewport_stock);
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
        let stocks = <p>Data Cannot be loaded</p>;
        if (this.state.owned_stocks) {
            stocks = <Stocks
                stockDisplayed={this.displayStock}
                owned_stocks={this.state.owned_stocks}
            />
        }
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
                        portfolio={this.state.portfolio}
                        buyPower={this.state.buyPower}
                        stockNet={this.state.stockNet}
                        percent={this.state.percent}
                        gain_loss={this.state.gain_loss}
                    />
                </div>
                <div className={classes.tool}>
                    <Tools />
                </div>
                <div className={classes.view}>
                    <Viewport
                        symbol={this.state.viewport_stock.symbol}
                        purchasePrice={this.state.viewport_stock.purchasePrice}
                        marketPrice={this.state.viewport_stock.marketPrice}
                        gain_or_loss={this.state.viewport_stock.gain_or_loss}
                        graph_data={this.state.graph_data}
                        portfolioGraph={this.state.portfolioGraph}
                        stockGraph={this.state.stockGraph}
                        display_porfolio={() => this.displayPortfolio()}
                        logo={this.state.logo}
                        openModal={this.handleOpenModal}
                    />
                    <BuyModal
                        showModal={this.state.buyModal}
                        handleCloseModal={this.handleCloseModal}
                        stock={this.state.viewport_stock.symbol}
                        buyQuantity={this.state.buySellQuantity}
                        changeQuantity={this.quantityChangeHandler}
                        marketPrice={this.state.viewport_stock.marketPrice}
                    />
                    <SellModal
                        showModal={this.state.sellModal}
                        handleCloseModal={this.handleCloseModal}
                        stock={this.state.viewport_stock.symbol}
                        buyQuantity={this.state.buySellQuantity}
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
                    />   
                </div>
                <div className={classes.stock}>{stocks}</div>
                <div className={classes.session}>
                    <SessionSettings
                        className={classes.session}
                        sessionDate={this.state.sessionDate}
                        startDate={this.state.startDate}
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