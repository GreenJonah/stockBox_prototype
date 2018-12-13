import React from "react";
import Aux from '../../hoc/Auxx';
import classes from './Names.css';
  
    const Names = (props) => {        
        return (
            <select 
                className={classes.select}
                onChange={props.sessionSelected}
            >
            <option value="no">
                Select a Session
            </option>
            {props.allSessions.map(session => (
                <option 
                    key={session.key} 
                    value={session.key}
            >
                {session.name}
            </option>
            ))}
            </select>
        );
  };
 
export default Names;