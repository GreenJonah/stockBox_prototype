import React from 'react';
import classes from './Graph.css';
import {Line} from 'react-chartjs-2';

const graph = (props) => {

    let ClassColor = classes.Green;
    if (props.color === "red") {
        ClassColor = classes.Red;
    }
    // props.type
    return (
        <div className={classes.GraphBox}>
        <Line
          data={props.chartData}
          options={{
              responsive: true,
              maintainAspectRatio: false,
          }}
        />
        </div>
    );
};

export default graph;