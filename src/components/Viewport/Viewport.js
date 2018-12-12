import React from 'react';
import Graph from './Graph/Graph';
import Aux from '../../hoc/Auxx';
import classes from './Viewport.css';
import home from '../../images/home.svg';

const viewport = (props) => {
    console.log("PortfolioGraph: ", props.portfolioGraph);
    let view = <div className={classes.box1}>
                    <div className={classes.graph}>
                        <Graph graphData={props.portfolioGraph}/>
                    </div>
                </div>;
    if (props.symbol !== "") {
        let box_color = classes.Green;
        if (props.gain_or_loss < 0) 
            box_color = classes.Red;
            
        let logo_tag = props.logo;
        if (props.logo !== "NA") {
            logo_tag = <img src={props.logo} alt="LOGO!!" height="50" width="50"/>
        }

        let sellButton = null;
        if (!props.not_owned) {
            sellButton = <button onClick={props.openSellModal} value='sell'>Sell</button>
        }
        console.log("Stock graph: ", props.stockGraph);
        view = <div className={classes.box2}>
            <div className={classes.logo}>{logo_tag}</div>
            <div className={classes.miniWrapper}>
                <img src={home}  onClick={props.display_porfolio} className={classes.MiniGraph} />
            </div>
            <div className={classes.graph}>
            <Graph
                type={props.graph_data}
                graphData={props.stockGraph}
            />
            </div>
            <div className={classes.StockInfo}>
                <div className={classes.MarketPrice}>
                    Market Price
                    <div className={classes.Prices}>{props.marketPrice.toFixed(2)}</div>
                </div>
                <div className={classes.GainLoss}>
                    Gain/Loss
                    <div className={box_color}>{props.gain_or_loss.toFixed(2)}</div>
                </div>
            </div>
            <div className={classes.Trading}>
                <button onClick={props.openBuyModal} value='buy'>Buy</button>
                {sellButton}
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