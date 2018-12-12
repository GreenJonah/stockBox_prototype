import React from 'react';
import classes from './SearchBar.css';

const searchBar = (props) => {

    let cssClasses = "";

    if (props.searchStyle == "Search") {
        cssClasses = classes.Search;
    } else {
        cssClasses = classes.EmptyImage
    }
    
    return (
        <div>
            <input 
                className={cssClasses} 
                type="text" 
                value={props.value} 
                onChange={evt => props.typeStock(evt)}
                placeholder="search"
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