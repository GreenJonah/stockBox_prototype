import React from 'react';
import Graph from '../Viewport/Graph/Graph';
import Aux from '../../hoc/Auxx';
import classes from './Viewport.css';

const viewport = (props) => {

    console.log(props.symbol);

    let view = <div className={classes.box}>
                    <p className={classes.title}>PORTFOLIO</p>
                    <Graph type={props.graph_type}/>
                </div>;
    let symbol_upper = props.symbol.toUpperCase();

    if (props.symbol !== "") {
        let graph_color = "green";
        let box_color = classes.Green;
        if (props.gain_or_loss < 0) {
            graph_color = "red";
            box_color = classes.Red;
        }
        view = <div className={classes.box}>
            <p className={classes.title}>{symbol_upper}</p>
            <Graph
                type={props.graph_type}
                color={graph_color}
            />
            <p className={classes.PurchasePrice}>
                Purchase Price:
                <div className={classes.Prices}>{props.purchasePrice}</div>
            </p>
            <p className={classes.MarketPrice}>
                Market Price:
                <div className={classes.Prices}>{props.marketPrice}</div>
            </p>
            <p className={classes.GainLoss}>
                Gain/Loss:
                <div className={box_color}>{props.gain_or_loss}</div>
            </p>
            <button>Sell</button>
            <button>Buy</button>
        </div>
    }

    return (
       <Aux>
            {view}
       </Aux>
    );
};

export default viewport;