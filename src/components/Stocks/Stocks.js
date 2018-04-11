import React from 'react';
import Stock from './Stock/Stock';

const stocks = (props) => (
    <div>
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