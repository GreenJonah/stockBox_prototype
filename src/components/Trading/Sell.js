import React from 'react';
import ReactModal from 'react-modal';
import classes from './Trading.css';

const modal = (props) => {
  return (
      <ReactModal
          isOpen={props.showModal}
          contentLabel="Sell Modal"
          onRequestClose={props.handleCloseModal}
          className={classes.modal}
          overlayClassName="Overlay"
      >
        <div className={classes.wrapper}>
            <p className={classes.buyTitle}>Selling {props.stock.toUpperCase()}</p>
            <button 
              onClick={props.changeQuantity} 
              className={classes.add} 
              value={'+'}
            >
              +
            </button>
            <input 
              className={classes.quantity} 
              value={props.sellQuantity}
              onChange={props.changeQuantity}
            >
            </input>
            <p className={classes.costLabel}>Profit:</p>
            <p className={classes.cost}>{(props.sellQuantity * props.marketPrice).toLocaleString('en')}</p>
            <button 
              onClick={props.changeQuantity} 
              className={classes.minus} 
              value={'-'}
            >
              -
            </button>
            <button 
              onClick={(event) => props.sold(props.stock, event)}
              className={classes.purchase}
              value='sell'
            >
              Sell
            </button>
            <button 
              onClick={props.handleCloseModal} 
              className={classes.cancel}
              value='sell'
            >
              Cancel
            </button>
        </div>
      </ReactModal>
  );
};

export default modal;