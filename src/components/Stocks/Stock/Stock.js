import React from 'react';
import classes from './Stock.css';

const stock = (props) => {

    let percentage = (props.percentage).toFixed(2);
    let market_price = (props.market_price).toFixed(2);
    let change = (props.change).toFixed(2);
    let percentage_style = classes.PercentagePos;
    if (percentage < 0){
        percentage_style = classes.PercentageNeg;
    }
    let symbol_upper = props.symbol.toUpperCase();
    return (
        <div className={classes.StockButton}>
            <button onClick={props.display}>
                <p className={classes.Symbol}>{symbol_upper}</p>
                <p className={percentage_style}>{percentage}%</p>
                <p className={classes.MarketPrice}>{market_price}</p>
                <p className={classes.Change}>{change}</p>
            </button>
        </div>
    );

};

export default stock;