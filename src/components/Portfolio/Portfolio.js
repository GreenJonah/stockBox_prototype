import React from 'react';
import classes from './Portfolio.css';

const portfolio = (props) => {

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
                        {props.portfolio}
                    </div>
                </div>
                <div className={classes.label}>
                    Buy Power
                    <div className={[classes.values, classes.green].join(' ')}>
                        {props.buyPower}
                    </div>
                </div>
                <div className={classes.label}>
                    Stock Net
                    <div className={[classes.values, classes.green].join(' ')}>
                        {props.stockNet}
                    </div>
                </div>
                <div className={classes.label}>
                    Returns
                    <div className={[classes.values, color].join(' ')}>
                        {props.percent}%
                    </div>
                </div>
                <div className={classes.label}>
                    Gains/Loss
                    <div className={[classes.values, color].join(' ')}>
                        {props.gain_loss}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default portfolio;