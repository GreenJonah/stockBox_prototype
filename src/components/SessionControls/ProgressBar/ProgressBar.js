import React from 'react';
import classes from './ProgressBar.css';

let formatDate = (month, day, year) => {
    let date = month + '/' + day + '/' + year;
    return date;
}

const progressBar = (props) => {
    // Get total milliseconds for current date
    let currentDate = new Date();

    // Make a Current date to display
    let curDate = formatDate(currentDate.getMonth() + 1, currentDate.getDate(),
                             currentDate.getFullYear());
    
    let curDateMilli = Date.now();
    
    
    

    // Set Session Date This variable will come from the user
    // To get the progress bar working it will be manually set here
    let sessionDate = new Date('July 20, 2010');
    let sessionDateMilli = sessionDate.getTime();
    
    let displaySessionDate = formatDate(sessionDate.getMonth() + 1, sessionDate.getDate(),
    sessionDate.getFullYear());;


    /* Divide curDateMilli by sessionDateMilli to get percentage 
       for progress bar */
    let progress = Math.round(sessionDateMilli / curDateMilli * 100);
    
    return (
        <div className={classes.wrapper}>
        <div className={classes.pastDate}>{displaySessionDate}</div>
        <div className={classes.bar}></div>
        <div className={classes.currentDate}>{curDate}</div>
        </div>
    );
};

export default progressBar;