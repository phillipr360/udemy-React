import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactInfo from './ContactInfo/ContactInfo';

const INGREDIENTS = ["cheese", "meat", "salad", "bacon"];
const PRICEKEY = "price";
const PRICE = 4;

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }
  
  componentDidMount() {
    if (this.props.location.search) {
      const params = new URLSearchParams(this.props.location.search);
      
      const ingredients = {};
      let hasIngredients = false;
      let price = 0;
      let hasPrice = false;
      for (let param of params) {
        let key = decodeURI(param[0]);
        if (INGREDIENTS.includes(key)) {
          let value = parseInt(decodeURI(param[1])) || 0;
          ingredients[key] = value;
          hasIngredients = true;
        }
        else if (key === PRICEKEY) {
          price = parseFloat(decodeURI(param[1])) || PRICE;
          hasPrice = true;
        }
      }
      
      if (hasIngredients && hasPrice) {
        this.setState({
          ingredients: ingredients,
          totalPrice: price
        });
      }
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
    if (!!this.state.ingredients && !!this.state.totalPrice) {
      checkoutSummary = (
        <div>
          <CheckoutSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            continueCheckout={this.continueCheckout}
            cancelCheckout={this.cancelCheckout}
          />
          <Route 
            path={`${this.props.match.url}/contact`} 
            render={() => (
              <ContactInfo 
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
              />
            )}
          />
        </div>
      );
    }
    
    return checkoutSummary;
  }
}

export default Checkout;