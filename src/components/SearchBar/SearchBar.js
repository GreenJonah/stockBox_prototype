import React from 'react';
import classes from './SearchBar.css';

const searchBar = (props) => {

    return (
        <div className={classes.box}>
            <div>SEARCH BAR</div>
            <div className={classes.title}>STOCKS</div>
        </div>
    );
};

export default searchBar;