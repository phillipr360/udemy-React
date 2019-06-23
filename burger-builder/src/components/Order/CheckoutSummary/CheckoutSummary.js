import React from 'react';
import classes from './CheckoutSummary.css';
import PropTypes from 'prop-types';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
  
  return (
    <div className={classes.CheckoutSummary}>
      <h1>I hope it tastes good!</h1>
      <h3>Total Price: ${props.totalPrice.toFixed(2)}</h3>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button
        btnType="Success"
        clicked={props.continueCheckout}
      >CONTINUE</Button>
      <Button
        btnType="Danger"
        clicked={props.cancelCheckout}
      >CANCEL</Button>
    </div>
  );
}

checkoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  totalPrice: PropTypes.number.isRequired,
  continueCheckout: PropTypes.func,
  cancelCheckout: PropTypes.func
};

export default checkoutSummary;