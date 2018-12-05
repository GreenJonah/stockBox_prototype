import React from 'react';
import classes from './IntervalControl.css';

const intervalControl = (props) => {
    return (
        <div className={classes.wrapper}>
        <div className={classes.intervalTitle}>Interval</div> 
            <select value={props.interval} onChange={props.intervalChange} className={classes.intervalSelect} name="Interval">
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
                <option value="finish">Finish</option>
            </select>
            <button className={classes.nextButton} onClick={props.next}>Next</button>
        </div>
    );
};

export default intervalControl;