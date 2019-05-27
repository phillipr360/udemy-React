import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(key => {
      return (
        <li key={key}>
          <span style={{textTransform: 'capitalize'}}>
            {key}: {props.ingredients[key]}
          </span>
        </li>
      );
    });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Total Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button
        btnType="Success"
        clicked={props.continueHandler}
      >
        CONTINUE
      </Button>
      <Button
        btnType="Danger"
        clicked={props.cancelHandler}
      >
        CANCEL
      </Button>
    </Aux>
  )
};

export default orderSummary;