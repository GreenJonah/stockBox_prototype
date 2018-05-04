import React from 'react';
import classes from './IntervalControl.css';

const intervalControl = (props) => {
    return (
        <div>
        <div className={classes.intervalTitle}>Interval</div> 
            <select className={classes.custom} name="Interval">
                <option value="Hour">Hour</option>
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
                <option value="Finish">Finish</option>
            </select>
            <button className={classes.nextButton}>-></button>
        </div>
    );
};

export default intervalControl;