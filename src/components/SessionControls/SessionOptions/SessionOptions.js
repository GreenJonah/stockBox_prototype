import React from 'react';
import classes from './SessionOptions.css';

const sessionOptions = (props) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>Session Options</div>
            <button className={classes.save}>Save</button>
            <button className={classes.open}>Open</button>
            <button className={classes.quit}>Quit</button>
        </div>
    );
};

export default sessionOptions;