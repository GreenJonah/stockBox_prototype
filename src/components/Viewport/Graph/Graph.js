import React from 'react';
import classes from './Graph.css';
import {Line} from 'react-chartjs-2';

const graph = (props) => {

    return (
        <div className={classes.GraphBox}>
        <Line
            data={props.graphData}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        fontColor: 'black',
                        fontSize: 28
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: 'black'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: 'black'
                        }
                    }]
                }
            }
        }
        />
        </div>
    );
};

export default graph;