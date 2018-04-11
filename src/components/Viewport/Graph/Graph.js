import React from 'react';
import classes from './Graph.css';

const graph = (props) => {

    let ClassColor = classes.Green;
    if (props.color === "red") {
        ClassColor = classes.Red;
    }

    return (
        <div className={[classes.GraphBox, ClassColor].join(' ')}>{props.type}</div>
    );
};

export default graph;