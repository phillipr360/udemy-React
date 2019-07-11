import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactInfo from './ContactInfo/ContactInfo';

class Checkout extends Component {
  continueCheckout = () => {
    this.props.history.replace("/checkout/contact");
  }
  
  cancelCheckout = () => {
    this.props.history.goBack();
  }
  
  render() {
    let checkoutSummary = <h1 style={{textAlign: "center"}}>No Ingredients Yet</h1>;
    if (!!this.props.ingredients && !!this.props.totalPrice && this.props.totalIngredients > 0) {
      checkoutSummary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            totalPrice={this.props.totalPrice}
            continueCheckout={this.continueCheckout}
            cancelCheckout={this.cancelCheckout}
          />
          <Route 
            path={`${this.props.match.url}/contact`} 
            component={ContactInfo}
          />
        </div>
      );
    }
    
    return checkoutSummary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalIngredients: state.totalIngredients,
    totalPrice: state.totalPrice
  }
};

export default connect(mapStateToProps)(Checkout);