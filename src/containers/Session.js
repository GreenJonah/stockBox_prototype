import React, {Component} from 'react';
import Aux from '../hoc/Auxx';
import Portfolio from '../components/Portfolio/Portfolio';
import SearchBar from '../components/SearchBar/SearchBar';
import SessionSettings from '../components/SessionSettings/SessionSettings';
import Stocks from '../components/Stocks/Stocks';
import Viewport from '../components/Viewport/Viewport'

class Session extends Component {

    render() {
        return (
           <Aux>
               <Portfolio/>
               <SearchBar/>
               <Viewport/>
               <SessionSettings/>
               <Stocks/>
               {/*<Tools/>*/}
           </Aux>
        );
    }
}

export default Session;