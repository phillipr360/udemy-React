import React, { Component } from 'react';
import classes from './Checkout.css';

import Aux from '../../hoc/Aux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      meat: 1,
      cheese: 1,
      bacon: 1,
      salad: 1
    }
  }
  
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}

export default Checkout;