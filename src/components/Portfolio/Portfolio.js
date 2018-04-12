import React from 'react';
import classes from './Portfolio.css';

const portfolio = () => {
    return (
        <div className={classes.box}>
            <div className={classes.title}>STOCK BOX</div>
            <div className={classes.wrapper}>
                <div className={classes.label}>Portfolio</div>
                <div className={classes.label}>Buy Power</div>
                <div className={classes.label}>Stock Net</div>
                <div className={classes.label}>Returns</div>
                <div className={classes.label}>Gains/Loss</div>
            </div>
        </div>
    );
};

export default portfolio;