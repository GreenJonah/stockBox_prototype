import React from 'react';
import ReactModal from 'react-modal';
import classes from './Trading.css';

const modal = (props) => {
  return (
      <ReactModal
          isOpen={props.showModal}
          contentLabel="Buy Modal"
          onRequestClose={props.handleCloseModal}
          className={classes.modal}
          overlayClassName="Overlay"
      >
        <div className={classes.wrapper}>
            <p className={classes.buyTitle}>Buying {props.stock.toUpperCase()}</p>
            <button 
              onClick={props.changeQuantity} 
              className={classes.add} 
              value={'+'}
            >
              +
            </button>
            <input 
              className={classes.quantity} 
              value={props.buyQuantity}
              onChange={props.changeQuantity}
            >
            </input>
            <p className={classes.costLabel}>Cost:</p>
            <p className={classes.cost}>{(props.buyQuantity * props.marketPrice).toLocaleString('en')}</p>
            <button 
              onClick={props.changeQuantity} 
              className={classes.minus} 
              value={'-'}
            >
              -
            </button>
            <button 
              onClick={(event) => props.purchased(props.stock, event)}
              className={classes.purchase}
              value='buy'
            >
              Purchase
            </button>
            <button 
              onClick={props.handleCloseModal} 
              className={classes.cancel}
              value='buy'
            >
              Cancel
            </button>
        </div>
      </ReactModal>
  );
};

export default modal;