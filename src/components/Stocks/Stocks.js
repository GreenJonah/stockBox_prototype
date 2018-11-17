import React from 'react';
import Stock from './Stock/Stock';
import classes from './Stocks.css';
import Aux from '../../hoc/Auxx';

const stocks = (props) => (
    <Aux>
        <div className={classes.title}>STOCKS</div>
            {props.owned_stocks.map(stock => (
                <Stock
                    key={stock.symbol}
                    symbol={stock.symbol}
                    market_price={stock.marketPrice}
                    percentage={stock.changePercent}
                    change={stock.change}
                    display={() => props.stockDisplayed(stock.symbol)}
                />
            ))}
    </Aux>
);

export default stocks;