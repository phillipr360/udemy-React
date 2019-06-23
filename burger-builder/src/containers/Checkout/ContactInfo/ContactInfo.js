import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './ContactInfo.css';

import axios from '../../../axiosOrders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactInfo extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "US"
    },
    loading: false
  }
  
  orderBurger = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);
    
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalprice,
      displayPrice: `$${this.props.totalPrice.toFixed(2)}`,
      customer: {
        name: 'Phil R',
        address: {
          street: '123 Fake Street',
          city: 'Boston',
          state: 'MA',
          zip: '02116',
          country: 'US'
        },
        email: 'tom.brady@example.com'
      },
      deliveryMethod: 'fastest'
    };
    
    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  }
  
  render() {
    let form = (
      <div className={classes.ContactInfo}>
        <h4>Enter your Contact Info:</h4>
        <form>
          <input type="text" name="name" placeholder="Name:" />
          <input type="text" name="email" placeholder="Email:" />
          <input type="text" name="street" placeholder="Street Address:" />
          <input type="text" name="city" placeholder="City:" />
          <input type="text" name="state" placeholder="State:" />
          <input type="text" name="zip" placeholder="Zipcode:" />
          <Button btnType="Success" clicked={this.orderBurger}>ORDER</Button>
        </form>
      </div>
    );
    if (this.state.loading) {
      form = <Spinner/>;
    }
    
    return form;
  }
}

export default withRouter(ContactInfo);