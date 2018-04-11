import React from 'react';

const stock = (props) => {

    let percentage = 100 * props.percentage;

    return (
        <div>
            <button onClick={props.display}>
                <div>{props.symbol}</div>
                <div>{props.market_price}</div>
                <div>{percentage}%</div>
                <div>{props.change}</div>
            </button>
        </div>
    );

};

export default stock;