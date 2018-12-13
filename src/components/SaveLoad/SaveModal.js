import React from 'react';
import ReactModal from 'react-modal';
import classes from './Save.css';

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
                <p className={classes.heading}>Create a new session</p>
                <p className={classes.sessionNameTitle}>New Session Name</p>
                <input  
                    className={classes.sessionName}
                    value={props.newName}
                    onChange={props.changeName}
                >
                </input>
                <p className={classes.startingMoneyTitle}>Starting Money</p>
                <input 
                    className={classes.startingMoney}
                    value={props.startingMoney}
                    onChange={props.changeStartingMoney}
                >
                </input>
                <button
                    onClick={props.createNewState}
                    value='save'
                    className={classes.create}
                >
                    Create
                </button>
                <button 
                    onClick={props.handleCloseModal} 
                    value='save'
                    className={classes.cancel}
                >
                    Cancel
                </button>
            </div>
        </ReactModal>
    );
  };
  
  export default modal;