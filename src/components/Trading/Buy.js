import React from 'react';
import ReactModal from 'react-modal';
import classes from './Trading.css';

const modal = (props) => {

  let disablePlus = false;
  let disableMinus = false;
  let cost = 0;
  if (props.showModal) {
      cost = (props.buyQuantity * props.marketPrice).toFixed(2);

      let nextCost = ((props.buyQuantity + 1) * props.marketPrice).toFixed(2);
      console.log("Cost buy: " + nextCost);

      if (nextCost > props.buy_power) {
        disablePlus = true;
      }

      if (parseInt(props.buyQuantity) == 0) {
        disableMinus = true;
      }
  }

  return (
      <ReactModal
          isOpen={props.showModal}
          contentLabel="Buy Modal"
          onRequestClose={props.handleCloseModal}
          className={classes.modal}
          overlayClassName={classes.Backdrop}
      >
        <div className={classes.wrapper}>
            <p className={classes.buyTitle}>Buying {props.stock.symbol.toUpperCase()}</p>
            <button 
              onClick={props.changeQuantity} 
              className={classes.add} 
              value={'+'}
              disabled={disablePlus}
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
            <p className={classes.cost}>{cost}</p>
            <button 
              onClick={props.changeQuantity} 
              className={classes.minus} 
              value={'-'}
              disabled={disableMinus}
            >
              -
            </button>
            <button 
              onClick={(event) => props.purchased(props.stock.symbol, event)}
              className={classes.purchase}
              value='buy'
              disabled={disableMinus}
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