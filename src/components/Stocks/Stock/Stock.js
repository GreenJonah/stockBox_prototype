import React from 'react';
import classes from './Stock.css';

const stock = (props) => {

    let percentage = 100 * props.percentage;
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
                <p className={classes.MarketPrice}>{props.market_price}</p>
                <p className={classes.Change}>{props.change}</p>
            </button>
        </div>
    );

};

export default stock;