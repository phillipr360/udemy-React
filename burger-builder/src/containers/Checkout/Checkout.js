import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: null
  }
  
  componentDidMount() {
    if (this.props.location.search) {
      const params = new URLSearchParams(this.props.location.search);
      
      const ingredients = {};
      for (let param of params) {
        let key = decodeURI(param[0]);
        let value = parseInt(decodeURI(param[1])) || 0;
        ingredients[key] = value;
      }
      
      this.setState({
        ingredients: ingredients
      })
    }
  }
  
  continueCheckout = () => {
    this.props.history.replace("/checkout/contact");
  }
  
  cancelCheckout = () => {
    this.props.history.goBack();
  }
  
  render() {
    let checkoutSummary = <h1 style={{textAlign: "center"}}>No Ingredients Yet</h1>;
    if (!!this.state.ingredients) {
      checkoutSummary = (
        <CheckoutSummary
          ingredients={this.state.ingredients}
          continueCheckout={this.continueCheckout}
          cancelCheckout={this.cancelCheckout}
        />
      );
    }
    
    return (
      <div>
        {checkoutSummary}
      </div>
    );
  }
}

export default Checkout;