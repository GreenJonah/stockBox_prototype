import React from 'react';
import classes from './Portfolio.css';

const portfolio = (props) => {

    let percent = (parseFloat(props.percent) * 100).toFixed(2);
    let total = (props.portfolio).toFixed(2);
    let buy_power = (props.buyPower).toFixed(2);
    let stock_net = (props.stockNet).toFixed(2);
    let gain_loss = 0;
    if (parseInt(props.gain_loss.length) > 0) {
        gain_loss = (props.gain_loss[props.gain_loss.length - 1]).toFixed(2);
    } 
    let color = classes.green;
    if (props.percent < 0) {
        color = classes.red;
    }
    return (
        <div className={classes.box}>
            <div className={classes.title}>STOCK BOX</div>
            <div className={classes.wrapper}>
                <div className={classes.label}>
                    Portfolio
                    <div className={[classes.values, classes.green].join(' ')}>
                        {total}
                    </div>
                </div>
                <div className={classes.label}>
                    Buy Power
                    <div className={[classes.values, classes.green].join(' ')}>
                        {buy_power}
                    </div>
                </div>
                <div className={classes.label}>
                    Stock Net
                    <div className={[classes.values, classes.green].join(' ')}>
                        {stock_net}
                    </div>
                </div>
                <div className={classes.label}>
                    Returns
                    <div className={[classes.values, color].join(' ')}>
                        {percent}%
                    </div>
                </div>
                <div className={classes.label}>
                    Gains/Loss
                    <div className={[classes.values, color].join(' ')}>
                        {gain_loss}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default portfolio;