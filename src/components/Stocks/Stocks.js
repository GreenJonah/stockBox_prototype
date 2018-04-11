import React from 'react';
import Stock from './Stock/Stock';
import classes from './Stocks.css';

const stocks = (props) => (
    <div className={classes.box}>
        {props.market_stocks.map(stock => (
            <Stock
                key={stock.symbol}
                symbol={stock.symbol}
                market_price={stock.latestPrice}
                percentage={stock.changePercent}
                change={stock.change}
                display={() => props.stockDisplayed(stock.symbol)}
            />
        ))}
    </div>
);

export default stocks;