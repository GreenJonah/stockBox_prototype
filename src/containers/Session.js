import React, { Component } from 'react';
import { firebaseURL, iextradingURL } from '../axios-service';
import Portfolio from '../components/Portfolio/Portfolio';
import SearchBar from '../components/SearchBar/SearchBar';
import SessionSettings from '../components/SessionControls/SessionControls';
import Stocks from '../components/Stocks/Stocks';
import Viewport from '../components/Viewport/Viewport';
import Tools from '../components/Tools/Tools';
import classes from './Session.css';
import * as FirebaseServices from '../SharedServices/FirebaseServices';

class Session extends Component {


    // CONTAINER

    // SEARCH BAR
    // type in symbol
    // Search through list of stock symbols
    // If exists among list And is part of the owned stocks then show that stock
    // If exists among list And is not part of owned stocks then make api call, show that stock
    // If does not exist among list, make api call, show stock else display no stock found

    // Symbols array for searching
    // market stocks for the ones you looked at on that day, if you go back to them, the api does not have to look them up again
    //    unless it is on a new day and needs to update the data
    // Owned stock will be initially right away, and will need to be updated on every new session change, this will have to use the milliseconds date
    //   if not the same as the 

    // OUR OWNED STOCK OBJECTS WILL LOOK LIKE THIS
    // owned_stock: {
    //     symbol: "aapl",
    //     purchase_date: 129329343243,
    //     purchase_price: 160,
    //     purhcase_count: 3,
    //     purchase: true,
    //     latest_price: 168,
    //     gain_or_loss: 8,
    //     changePercent: 0.01026,
    //     change: 1.71
    // }

    state = {
        error: false,
        owned_stocks: null,
        symbols: null,
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
        sessionDate: 1279605600000,
        startDate: 1279605600000,
        interval: "hour",
        chartData:{}
    };


    componentDidMount() {

        FirebaseServices.getAllStockDataFromFirebase()
            .then(response => {
                console.log("MARKET IS THIS REAL?: ", response);
                this.setState({
                    owned_stocks: response
                });
            })
            .catch(error => {
                this.setState({ error: true })
            });;

        FirebaseServices.getAllSymbolDataFromFirebase()
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

        iextradingURL.get("/stock/" + symbol + "/logo")
            .then(response => {
                console.log(this.state.owned_stocks);
                console.log(symbol);

                let stock = null;
                const owned = [
                    ...this.state.owned_stocks
                ];
                console.log(owned, " length: " + owned.length);
                for (let i = 0; i < owned.length; i++) {
                    if (owned[i].symbol === symbol) {
                        this.setState({ viewport_stock: owned[i] });
                        this.setState({ graph_data: symbol });
                        console.log(owned[i]);
                    }
                }

                this.setState({ logo: response.data.url });
                console.log(response.data);
            })
            .catch(error => {
                this.setState({ error: true })
            });
    };

    componentWillMount(){
        this.getChartData();
      } 

    getChartData(){
        // Ajax calls here
        this.setState({
          chartData:{
            labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
            datasets:[
              {
                label:'Population',
                data:[
                  617594,
                  181045,
                  153060,
                  106519,
                  105162,
                  95072
                ],
              }
            ]
          }
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
    }

    intervalChangeHandler = (event) => {
        this.setState({
            interval: event.target.value
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

        return (
            <div className={classes.wrapper}>
                <div className={classes.search}><SearchBar /></div>
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
                        chartData={this.state.chartData}
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