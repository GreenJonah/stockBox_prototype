import React from 'react';
import Graph from '../Viewport/Graph/Graph';
import Aux from '../../hoc/Auxx';

const viewport = (props) => {

    console.log(props.symbol);

    let view = <div>Viewport<Graph type={props.graph_type}/> </div>;
    if (props.symbol !== "") {
        view = <div>
            Viewport
            <p>{props.symbol}</p>
            <Graph type={props.graph_type}/>
            <p>Purchase Price: {props.purchasePrice}</p>
            <p>Market Price: {props.marketPrice}</p>
            <p>Gain/Loss: {props.gain_or_loss}</p>
        </div>
    }

    return (
       <Aux>
            {view}
       </Aux>
    );
};

export default viewport;