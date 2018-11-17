import React, { Component } from 'react';
import Portfolio from '../components/Portfolio/Portfolio';
import SearchBar from '../components/SearchBar/SearchBar';
import SessionSettings from '../components/SessionControls/SessionControls';
import Stocks from '../components/Stocks/Stocks';
import axios from 'axios';
import Viewport from '../components/Viewport/Viewport';
import Tools from '../components/Tools/Tools';
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
    //     historical: [{
                         // marketPrice: 123,
                         // date: Apr 17
    //                  },{},{},
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
        sessionDate: 1411192800000,
        startDate: 1411192800000,
        interval: "hour",
        stockGraph:{},
        portfolioGraph:{},
        viewedStocks: null
    };


    componentDidMount() {

        apiServices.getAllStockData()
            .then(response => {
                console.log("MARKET data: ", response);
                this.setState({
                    owned_stocks: response
                });
            })
            .catch(error => {
                this.setState({ error: true })
            });;

        apiServices.getAllSymbolData()
            .then(response => {
                console.log("SYMBOL Data: ", response);
                this.setState({
                    symbols: response
                });
            })
            .catch(error => {
                this.setState({ error: true })
            });;
    }

    displayStock = (symbol) => {

        const owned = [
            ...this.state.owned_stocks
        ];

        let found = false;
        for (let i = 0; i < owned.length; i++) {
            if (owned[i].symbol === symbol) {
                found = true;
                this.setState({ viewport_stock: owned[i]});
                this.setState({ graph_data: symbol });
                this.setState({ logo: owned[i].logo});
                this.getStockGraph(owned[i].symbol);
            }
        }

        if (!found) {
           apiServices.getStockDataFromDate(null, this.state.sessionDate, symbol);
           // Now update stocks chart
        }
    };

    componentWillMount(){
        this.getPortfolioGraph();
      } 

    getPortfolioGraph(){
        let graphColor = 'rgb(109, 160, 9)';
        if (this.state.gain_loss < 0)
            graphColor = '#ff3333'
            
        this.setState({
            portfolioGraph:{
                labels: ['January', 'Febuary', 'March', 'April', 'May', 'June'],
                datasets:[
                {
                    label:'Gains/Losses',
                    data:[
                    60,
                    85,
                    45,
                    21,
                    5,
                    -50
                    ],
                    backgroundColor: graphColor,
                    borderColor: 'rgb(0, 0, 0)',
                    borderWidth: 1,
                    lineTension: 0,
                    pointRadius: 2,
                    fill: 'start',
                }
                ]
            }
        });
    }

    getStockGraph = async (symbol) => {
        // https://iextrading.com/developer/docs/#chart
        // Get stocks data for the past 5 years
        await apiServices.getChart(symbol)
            .then(response => {
     
            let stockHistory = response;
            let dates = [];
            let stockData = [];
            console.log('HERe', stockHistory[0].label)
            // Set the past 5 years of data but stop at the session date
            for(let i = 0; i < stockHistory.length; ++i)
            {
                let date = new Date(stockHistory[i].date)
                if (date.getTime() <= this.state.sessionDate)
                {
                    dates[i]     = stockHistory[i].label;
                    stockData[i] = stockHistory[i].high;
                }
                else   
                    break;
            }

            // set the graphs color
            let graphColor = 'rgb(109, 160, 9)';
            if ( this.state.viewport_stock.gain_or_loss < 0 )
                graphColor = '#ff3333'

            this.setState({
                stockGraph:{    
                    labels: dates,
                    datasets:[
                    {
                        label: '1 Year',
                        data: stockData,
                        backgroundColor: graphColor,
                        borderColor: 'rgb(0, 0, 0)',
                        borderWidth: 1,
                        lineTension: 0,
                        pointRadius: 2,
                        fill: 'start',
                    }
                    ],
                }
            });
        });
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
        this.getStockGraph(this.state.viewport_stock.symbol);
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
        } else if (this.state.filteredSymbols.length > 0) {
            this.setState({
                filteredSymbols: [],
                inputValue: ""
            })
        }
    }

    stockChosen = (symbol) => {

        this.setState({
            filteredSymbols: [],
            inputValue: ""
        });

        this.displayStock(symbol);
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
                        stockGraph={this.state.stockGraph}
                        portfolioGraph={this.state.portfolioGraph}
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
                        interval={this.state.interval}
                        next={this.dateChangeHandler}
                        intervalChange={this.intervalChangeHandler} />
                </div>
            </div>
        );
    }
}

export default Session;