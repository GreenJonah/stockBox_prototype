import React from 'react';
import Graph from '../Viewport/Graph/Graph';

const viewport = (props) => {

    // Jared
    return (
        <div>
            Viewport
            <p>{props.symbol}</p>
            <Graph/>
            <p>{props.purchasePrice}</p>
            <p>{props.marketPrice}</p>
            <p>{props.gain_or_loss}</p>
        </div>
    );
};

export default viewport;