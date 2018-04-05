import React, {Component} from 'react';
import Aux from '../hoc/Auxx';
import Graph from '../components/Graph/Graph';
import Portfolio from '../components/Portfolio/Portfolio';
import SearchBar from '../components/SearchBar/SearchBar';
import SessionSettings from '../components/SessionSettings/SessionSettings';
import Stocks from '../components/Stocks/Stocks';

class Session extends Component {

    render() {
        return (
           <Aux>
               <Portfolio/>
               <SearchBar/>
               <Graph/>
               <SessionSettings/>
               <Stocks/>
           </Aux>
        );
    }
}

export default Session;