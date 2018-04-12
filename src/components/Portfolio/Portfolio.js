import React from 'react';
import classes from './Portfolio.css';

const portfolio = () => {
    return (
        <div className={classes.box}>
            <div className={classes.gridcontainer}>
                <div className={classes.title}>STOCK BOX</div>
                <div className={classes.port}>Portfolio</div>
                <div className={classes.buy}>Buy Power</div>
                <div className={classes.net}>Stock Net</div>
                <div className={classes.returns}>Returns</div>
                <div className={classes.gains}>Gains/Loss</div>
            </div>
        </div>
    );
};

export default portfolio;