import React from 'react';
import classes from './SessionOptions.css';

const sessionOptions = (props) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>Session Options</div>
            <button className={classes.save} 
                onClick={props.openModal} 
                value='save'
            >
                New Session
            </button>
            <button className={classes.load}
                onClick={props.openModal}
                value='load'
            >
                Load Session
            </button>
        </div>
    );
};

export default sessionOptions;