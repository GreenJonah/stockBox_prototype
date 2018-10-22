import React from 'react';
import classes from './IntervalControl.css';

const intervalControl = (props) => {
    return (
        <div className={classes.wrapper}>
        <div className={classes.intervalTitle}>Interval</div> 
            <select className={classes.intervalSelect} name="Interval">
                <option value="Hour">Hour</option>
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
                <option value="Finish">Finish</option>
            </select>
            <button className={classes.nextButton} onClick={props.next}>Next</button>
        </div>
    );
};

export default intervalControl;