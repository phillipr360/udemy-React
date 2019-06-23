import React, { Component } from 'react';
import classes from './ContactInfo.css';

import Button from '../../../components/UI/Button/Button';

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
    }
  }
  
  orderBurger = () => {
    alert("Ordered!");
  }
  
  render() {
    return (
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
  }
}

export default ContactInfo;