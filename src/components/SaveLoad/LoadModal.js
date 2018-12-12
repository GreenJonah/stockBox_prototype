import React from 'react';
import ReactModal from 'react-modal';
import Names from './Names'
import classes from './Load.css';

const modal = (props) => {
    return (
        <ReactModal
            isOpen={props.showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={props.handleCloseModal}
            className={classes.modal}
            overlayClassName="Overlay"
        >
           <div className={classes.wrapper}>
                <p className={classes.loadTitle}>Load Session</p>
                <Names 
                    sessionSelected={props.sessionSelected} 
                    allSessions={props.allSessions}
                    session={props.session}
                    names={props.sessionNames}
                />
                <button 
                    className={classes.loadBtn}
                    onClick={props.handleCloseModal} 
                    value='load'
                >
                    load
                </button>
                <button 
                    className={classes.cancelBtn}
                    onClick={props.handleCloseModal} 
                    value='load'
                >
                    Cancel
                </button>
            </div>
        </ReactModal>
    );
  };
  
  export default modal;