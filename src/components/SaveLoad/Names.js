import React from "react";
import Aux from '../../hoc/Auxx';
import classes from './Names.css';
  
    const Names = (props) => {        
        return (
            <select 
                className={classes.select}
                value={props.session} 
                onChange={props.sessionSelected}
            >
            {props.allSessions.map(session => (
                <option 
                    key={session.key.toString()} 
                    value={session.name.toString()}
            >
                {session.name}
            </option>
            ))}
            </select>
        );
  };
 
export default Names;