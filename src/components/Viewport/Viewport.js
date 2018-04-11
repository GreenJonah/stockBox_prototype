import React from 'react';
import Graph from '../Viewport/Graph/Graph';
import Aux from '../../hoc/Auxx';
import classes from './Viewport.css';

const viewport = (props) => {

    console.log(props.symbol);

    let view = <div className={classes.box}>
                    <p className={classes.title}>PORTFOLIO</p>
                    <p className={classes.GraphPosition}>
                        <Graph type={props.graph_type}/>
                    </p>
                </div>;
    let symbol_upper = props.symbol.toUpperCase();

    if (props.symbol !== "") {
        let graph_color = "green";
        if (props.gain_or_loss < 0) {
            graph_color = "red";
        }
        view = <div className={classes.box}>
            <p className={classes.title}>{symbol_upper}</p>
            <p className={classes.GraphPosition}>
                <Graph
                    type={props.graph_type}
                    color={graph_color}
                />
            </p>
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