import React from 'react';
import classes from './CheckoutSummary.css';
import PropTypes from 'prop-types';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
  
  return (
    <div className={classes.CheckoutSummary}>
      <h1>I hope it tastes good!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button
        btnType="Success"
        clicked={() => alert("Continue")}
      >CONTINUE</Button>
      <Button
        btnType="Danger"
        clicked={() => alert("Cancel")}
      >CANCEL</Button>
    </div>
  );
}

checkoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  totalPrice: PropTypes.number
};

export default checkoutSummary;