import React from 'react';
import classes from './Graph.css';

const graph = (props) => {

    let ClassColor = classes.Green;
    if (props.color === "red") {
        ClassColor = classes.Red;
    }
    // props.type
    return (
        <div className={[classes.GraphBox, ClassColor].join(' ')}>
            <div className={classes.Line}>

            </div>
        </div>
    );
};

export default graph;