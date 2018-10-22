import React from 'react';
import classes from './ProgressBar.css';

let formatDate = (month, day, year) => {
    let date = month + '/' + day + '/' + year;
    return date;
}

const progressBar = (props) => {
    
    // Make a Current date and format it
    let currentDate = new Date();
    let curDate = formatDate(currentDate.getMonth() + 1, currentDate.getDate(),
                             currentDate.getFullYear());
    
    // Create a session and start date
    let sessionDate = new Date(`${props.sessionDate.month} ${props.sessionDate.day}, ${props.sessionDate.year}`);
    let startDate = new Date(`${props.startDate.month} ${props.startDate.day}, ${props.startDate.year}`);
    
    // Get milliseconds for session start and todays date.
    let sessionDateMilli = sessionDate.getTime();
    let startDateMilli   = startDate.getTime();
    let curDateMilli     = currentDate.getTime();

    // Get the percentage to fill the task bar with
    let percentage = 100 * (sessionDateMilli - startDateMilli) / (curDateMilli - startDateMilli);

    // Format session date to display it
    let displaySessionDate = formatDate(sessionDate.getMonth() + 1, sessionDate.getDate(),
    sessionDate.getFullYear());;

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