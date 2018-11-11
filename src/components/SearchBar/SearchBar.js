import React from 'react';
import classes from './SearchBar.css';

const searchBar = (props) => {

    return (
        <div>
            <input 
                className={classes.Search} 
                type="text" 
                value={props.value} 
                onChange={evt => props.typeStock(evt)}
                placeholder="Search for stocks..." 
                title="Type in a stock"/>
            {props.filteredList.map(symbol => (
                <div key={symbol.symbol}
                    className={classes.Stock} 
                    onClick={() => props.chooseStock(symbol.symbol)}>
                        {symbol.symbol}
                </div>
            ))}
        </div>
    );
};

export default searchBar;