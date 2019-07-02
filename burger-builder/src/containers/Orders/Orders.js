import React, { Component } from 'react';
//import { withRouter } from 'react-router-dom';
//import classes from './Orders.css';

import axios from '../../axiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
    error: false
  }
  
  componentDidMount() {
    axios.get('/orders.json')
      .then(response => {
        console.log(response.data);
        const orders = [];
        for (let key in response.data) {
          orders.push({
            ...response.data[key],
            id: key
          });
        }
        this.setState({
          orders: orders.reverse().slice(0, 5),
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false, error: error});
      });
  }
  
  render() {
    let orders = <Spinner/>;
   
    if (!this.state.loading) {
      if (this.state.error) {
        orders = <p>Cannot load Orders! {this.state.error.toString()}</p>
      }
      else if (this.state.orders.length === 0) {
        orders = <p>No Orders Available</p>;
      } else {
        orders = (
          <div>
            {this.state.orders.map(order => (
              <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
                deliveryInfo={order.deliveryInfo}
              />
            ))}
          </div>
        );
      }
    }
    return orders;
  }
}

export default withErrorHandler(Orders, axios);