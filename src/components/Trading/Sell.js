import React from 'react';
import ReactModal from 'react-modal';
import classes from './Trading.css';

const modal = (props) => {


  let disablePlus = false;
  let disableMinus = false;
  let cost = 0;
  if (props.showModal) {
      let total_stocks_owned = 0;
      for (let i = 0; i < props.stock.purchaseCounts.length; i++) {
          total_stocks_owned += parseInt(props.stock.purchaseCounts[i]);
      }
      console.log("TOTAL STOCKS OWNED: " + total_stocks_owned);

      let nextQuantity = props.sellQuantity + 1;

      if (nextQuantity > total_stocks_owned) {
          disablePlus = true;
      }

      if (parseInt(props.sellQuantity) == 0) {
        disableMinus = true;
      }

      cost = (props.sellQuantity * props.marketPrice).toFixed(2);
  }

  return (
      <ReactModal
          isOpen={props.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={props.handleCloseModal}
          className={classes.modal}
          overlayClassName="Overlay"
      >
        <div className={classes.wrapper}>
            <p className={classes.buyTitle}>Selling {props.stock.symbol.toUpperCase()}</p>
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
              value={props.sellQuantity}
              onChange={props.changeQuantity}
            >
            </input>
            <p className={classes.costLabel}>Profit:</p>
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
              onClick={(event) => props.sold(props.stock.symbol, event)}
              className={classes.purchase}
              value='sell'
              disabled={disableMinus}
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