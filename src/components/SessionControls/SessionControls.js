import React from 'react';
import classes from './SessionControls.css';
import IntervalControl from './IntervalControl/IntervalControl';
import SessionOptions from './SessionOptions/SessionOptions';
import ProgressBar from './ProgressBar/ProgressBar';


const sessionSettings = (props) => {
    return (
    <div className={classes.wrapper}>
        <div className={classes.title}>SESSION SETTINGS</div>
        <div className={classes.progress}>
            <ProgressBar
                sessionDate={props.sessionDate}
                startDate={props.startDate}
            />
        </div>
        <div className={classes.interval}>
            <IntervalControl 
                next={props.next}
                sessionDate={props.sessionDate}
            />
        </div>
        <div className={classes.options}><SessionOptions/></div>
    </div>
    );
};

export default sessionSettings;