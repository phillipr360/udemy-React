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
        validation: {
          required: true
        },
        value: '',
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        validation: {
          required: true,
          pattern: /\S+@(\S+\.)+\w{3}/
        },
        value: '',
        valid: false,
        touched: false
      },
      phone: {
        elementType: 'string',
        elementConfig: {
          type: 'text',
          placeholder: 'Phone Number'
        },
        validation: {
          minLength: 10,
          maxLength: 13,
          pattern: /\d+/
        },
        value: '',
        valid: false,
        touched: false
      },
      address: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          placeholder: 'Street Address'
        },
        validation: {
          required: true,
          minLength: 10
        },
        value: '',
        valid: false,
        touched: false
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'City'
        },
        validation: {
          required: true,
          minLength: 2,
          pattern: /^[A-Z]{2}$|^\w+([\s-]\w+)*$/
        },
        value: '',
        valid: false,
        touched: false
      },
      state: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'State/Province'
        },
        validation: {
          minLength: 2,
          pattern: /^[A-Z]{2}$|^\w+([\s-]\w+)*$/
        },
        value: '',
        valid: false,
        touched: false
      },
      zip: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip/Postal Code'
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 10,
          pattern: /^(\d{5}([-]\d{4})?)$|^([A-Z\d]{3}\s[A-Z\d]{3})$/
        },
        value: '',
        valid: false,
        touched: false
      },
      country: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'US', displayValue: 'US'},
            {value: 'CA', displayValue: 'CA'},
            {value: 'UK', displayValue: 'UK'},
            {value: 'EU', displayValue: 'EU'}
          ]
        },
        value: 'US',
        validation: {
          required: true
        },
        valid: true
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
            {value: 'premium', displayValue: 'Premium'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formValid: false,
    loading: false
  }
  
  orderBurger = (event) => {
    event.preventDefault();
    
    this.setState({loading: true});
    
    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    
    console.log(this.props.ingredients, this.props.totalPrice, formData);

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      displayPrice: `$${this.props.totalPrice.toFixed(2)}`,
      deliveryInfo: formData
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
  
  validate(value, rules={}) {
    if (rules.required) {
      if (value.trim() === "") {
        return false;
      }
    } else {
      if (value.trim() === "") {
        return true;
      }
    }
    if (rules.minLength) {
       if (value.trim().length < rules.minLength) {
         return false;
       }
    }
    if (rules.maxLength) {
      if (value.trim().length > rules.maxLength) {
        return false;
      }
    }
    if (rules.pattern) {
      if (!value.match(rules.pattern)) {
        return false;
      }
    }

    return true;
  }
  
  changeHandler = (event, key) => {
    const orderFormCopy = {
      ...this.state.orderForm
    };
    const updatedElement = {
      ...orderFormCopy[key]
    };
    updatedElement.touched = true;
    updatedElement.value = event.target.value;
    updatedElement.valid = this.validate(event.target.value, updatedElement.validation);
    orderFormCopy[key] = updatedElement;
    
    let formValid = true;
    for (let key of Object.keys(orderFormCopy)) {
      if (!orderFormCopy[key].valid) {
        formValid = false;
        break;
      }
    }
    
    this.setState({orderForm: orderFormCopy, formValid: formValid});
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
        <form onSubmit={this.orderBurger}>
          {formElementsArray.map(element =>
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              validate={element.config.touched && !!element.config.validation}
              invalid={!element.config.valid}
              changed={(event) => this.changeHandler(event, element.id)}
            />
          )}
          <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
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