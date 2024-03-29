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
                endDate={props.endDate}
            />
        </div>
        <div className={classes.interval}>
            <IntervalControl 
                next={props.next}
                interval={props.interval}
                intervalChange={props.intervalChange}
            />
        </div>
        <div className={classes.options}>
            <SessionOptions
                openModal={props.openModal}
            />
        </div>
    </div>
    );
};

export default sessionSettings;