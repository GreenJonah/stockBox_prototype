import React from 'react';
import classes from './SessionControls.css';
import IntervalControl from './IntervalControl/IntervalControl';
import SessionOptions from './SessionOptions/SessionOptions';
import ProgressBar from './ProgressBar/ProgressBar';


const sessionSettings = (props) => {
    return (
        <div className={classes.box}>
            SESSION SETTINGS
            <ProgressBar/>
            <IntervalControl/>
            <SessionOptions/>
        </div>
    );
};

export default sessionSettings;