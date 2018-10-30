import React from 'react';
import Graph from './Graph/Graph';
import Aux from '../../hoc/Auxx';
import classes from './Viewport.css';

const viewport = (props) => {
    let view = <div className={classes.box1}>
                    <div className={classes.title}>PORTFOLIO</div>
                    <div className={classes.miniWrapper}>
                        <button  onClick={props.display_porfolio} className={classes.MiniGraph}>-</button>
                    </div>
                    <div className={classes.graph}>
                        <Graph chartData={props.chartData}/>
                    </div>
                </div>;
    let symbol_upper = props.symbol.toUpperCase();

    if (props.symbol !== "") {
        let box_color = classes.Green;
        if (props.gain_or_loss < 0) 
            box_color = classes.Red;
            
        let logo_tag = props.logo;
        if (props.logo !== "NA") {
            logo_tag = <img src={props.logo} alt="LOGO!!" height="50" width="50"/>
        }

        view = <div className={classes.box2}>
            <div className={classes.title}>{symbol_upper}</div>
            <div className={classes.logo}>{logo_tag}</div>
            <div className={classes.miniWrapper}>
                <button  onClick={props.display_porfolio} className={classes.MiniGraph}>-</button>
            </div>
            <div className={classes.graph}>
            <Graph
                type={props.graph_data}
                chartData={props.chartData}
            />
            </div>
            <div className={classes.StockInfo}>
                <div className={classes.PurchasePrice}>
                    Purchase Price
                    <div className={classes.Prices}>{props.purchasePrice}</div>
                </div>
                <div className={classes.MarketPrice}>
                    Market Price
                    <div className={classes.Prices}>{props.marketPrice}</div>
                </div>
                <div className={classes.GainLoss}>
                    Gain/Loss
                    <div className={box_color}>{props.gain_or_loss}</div>
                </div>
            </div>
            <div className={classes.Trading}>
                <button >Sell</button>
                <button >Buy</button>
            </div>
        </div>
    }

    return (
       <Aux>
            {view}
       </Aux>
    );
};

export default viewport;