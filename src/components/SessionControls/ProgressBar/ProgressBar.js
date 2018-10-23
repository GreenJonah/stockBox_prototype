import React from 'react';
import classes from './ProgressBar.css';

let formatDate = (month, day, year) => {
    let date = month + '/' + day + '/' + year;
    return date;
}

const progressBar = (props) => {
    
    // Create our three dates
    let sessionDate = new Date(props.sessionDate);
    let startDate = new Date(props.startDate);
    let currentDate = new Date();

    // Get the percentage to fill the task bar with
    let percentage = 100 * (sessionDate - startDate) / (currentDate.getTime() - startDate);

    // Format session and current day to display
    let displaySessionDate = formatDate(sessionDate.getMonth() + 1, sessionDate.getDate(),
    sessionDate.getFullYear());;

    let curDate = formatDate(currentDate.getMonth() + 1, currentDate.getDate(),
    currentDate.getFullYear());

    return (
        <div className={classes.wrapper}>
            <div className={classes.pastDate}>{displaySessionDate}</div>
            <div className={classes.bar}>
                <div className={classes.progress} style={{width: `${percentage}%`}}></div>
            </div>
            <div className={classes.currentDate}>{curDate}</div>
        </div>
    );
};

export default progressBar;