import React from "react";
import Aux from '../../hoc/Auxx';
import classes from './Names.css';
  
    const Names = (props) => {        
        return (
            <Aux>
            {props.names.map((name) => (
                <button 
                    key={name.toString()} 
                    value={name}
                    className={classes.btn}
            >
                {name}
            </button>
            ))}
            </Aux>
        );
  };
 
export default Names;