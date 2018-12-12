import React from 'react';
import classes from './ProgressBar.css';
import Aux from '../../../hoc/Auxx';

let formatDate = (month, day, year) => {
    let date = month + '/' + day + '/' + year;
    return date;
}

const progressBar = (props) => {
    
    // Create our three dates
    let sessionDate = new Date(props.sessionDate);
    let startDate = new Date(props.startDate);
    let currentDate = new Date(props.endDate);

    // Get the percentage to fill the task bar
    let percentage = 100 * (sessionDate - startDate) / (currentDate.getTime() - startDate);

    // Format session and current day to display
    let displaySessionDate = formatDate(sessionDate.getMonth() + 1, sessionDate.getDate(),
    sessionDate.getFullYear());

    let curDate = formatDate(currentDate.getMonth() + 1, currentDate.getDate(),
    currentDate.getFullYear());

    let progressBarTag = <div className={classes.wrapper}>
                            <div className={classes.bar}>
                                <div className={classes.progress} style={{width: `${percentage}%`}}></div>
                            </div>
                        </div>
    if (parseInt(props.endDate) != 0) {
        progressBarTag = <div className={classes.wrapper}>
                            <div className={classes.pastDate}>{displaySessionDate}</div>
                            <div className={classes.bar}>
                                <div className={classes.progress} style={{width: `${percentage}%`}}></div>
                            </div>
                            <div className={classes.currentDate}>{curDate}</div>
                        </div>
    } 
    return (
        <Aux>
            {progressBarTag}
        </Aux>
    );
};

export default progressBar;