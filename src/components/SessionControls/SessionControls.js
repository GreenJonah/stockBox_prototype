import React from 'react';
import classes from './SessionControls.css';
import IntervalControl from './IntervalControl/IntervalControl';
import SessionOptions from './SessionOptions/SessionOptions';
import ProgressBar from './ProgressBar/ProgressBar';


const sessionSettings = (props) => {
    return (
        <div className={classes.box}>
            SESSION SETTINGS
            <div className={classes.wrapper}>
            <ProgressBar className={classes.progress}/>
            <IntervalControl className={classes.interval}/>
            <SessionOptions className={classes.options}/>
            </div>
        </div>
    );
};

export default sessionSettings;