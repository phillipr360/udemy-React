import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './ContactInfo.css';

import axios from '../../../axiosOrders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactInfo extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: ''
      },
      address: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          placeholder: 'Full Delivery Address'
        },
        value: ''
      },
      zip: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip/Postal code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      }
    },
    loading: false
  }
  
  orderBurger = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);
    
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
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
        this.props.history.push("/orders");
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  }
  
  render() {
    const formElementsArray = Object.keys(this.state.orderForm).map(key => {
      return {
        id: key,
        config: this.state.orderForm[key]
      };
    });

    let form = (
      <div className={classes.ContactInfo}>
        <h4>Enter your Contact Info:</h4>
        <form>
          {formElementsArray.map(element =>
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
            />
          )}
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