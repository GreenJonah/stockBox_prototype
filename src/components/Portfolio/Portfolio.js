import React from 'react';
import classes from './Portfolio.css';

const portfolio = () => {
    return (
        <div className={classes.box}>
            <div className={classes.title}>STOCK BOX</div>
            <div className={classes.wrapper}>
                <div className={classes.label}>
                    Portfolio
                    <div className={classes.values}>950</div>
                </div>
                <div className={classes.label}>
                    Buy Power
                    <div className={classes.values}>600</div>
                </div>
                <div className={classes.label}>
                    Stock Net
                    <div className={classes.values}>350</div>
                </div>
                <div className={classes.label}>
                    Returns
                    <div className={classes.values}>-5%</div>
                </div>
                <div className={classes.label}>
                    Gains/Loss
                    <div className={classes.values}>-50</div>
                </div>
            </div>
        </div>
    );
};

export default portfolio;