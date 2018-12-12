import React from 'react';
import ReactModal from 'react-modal';
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
                <p>Load Session</p>
                <button 
                    onClick={props.handleCloseModal} 
                    value='load'
                >
                    Load
                </button>
                <button 
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