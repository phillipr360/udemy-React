import React, { Component } from 'react';

import axios from '../../axiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler';
import Aux from '../../hoc/Aux';

import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const PRICE = 4;

class BurgerBuilder extends Component {
  //construtor(props) {
  //  super(props);
  //  this.state = {...}
  //}
  
  state = {
    ingredientInfo: null,
    ingredients: null,
    totalPrice: 0,
    canOrder: false,
    showPurchaseModal: false,
    loading: false,
    error: false
  }
  
  componentDidMount() {
    axios.get('/ingredients.json')
    .then(response => {
      console.log(response);
      const ingredientInfo = response.data;
      const ingredients = {};
      let initialPrice = PRICE;
      for (let key in ingredientInfo) {
        ingredients[key] = ingredientInfo[key]['qty'];
        initialPrice += (ingredients[key] * ingredientInfo[key]['price']);
      }
      
      this.setState({
        ingredientInfo: ingredientInfo,
        ingredients: ingredients, 
        totalPrice: initialPrice,
        canOrder: initialPrice > PRICE
      });
    })
    .catch(error => {
      console.log(error);
      this.setState({error: error});
    });
  }
  
  resetIngredientInfo(props) {
    axios.get('/ingredients.json')
    .then(response => {
      console.log(response);
      const ingredientInfo = response.data;
      const ingredients = {};
      const prices = {};
      let initialPrice = PRICE;
      for (let key in ingredientInfo) {
        ingredients[key] = ingredientInfo[key]['qty'];
        prices[key] = ingredientInfo[key]['price'];
        initialPrice += (ingredients[key] * prices[key]);
      }
      
      this.setState({
        ...props,
        ingredients: ingredients, 
        prices: prices,
        totalPrice: initialPrice,
        canOrder: initialPrice > PRICE
      });
    })
    .catch(error => {
      console.log(error);
      this.setState({error: error});
    });
  }
  
  updateCanOrder(ingredients) {
    // NOTE: It's more efficient to keep a running total ingredient count
    // This method naively loops through the whole Hashmap again
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({canOrder: sum > 0});
  }
  
  purchaseModalHandler = (showModal) => {
    this.setState({showPurchaseModal: showModal});
  }
  
  purchaseContinueHandler = () => {
    // alert(`You paid $${this.state.totalPrice.toFixed(2)}!`);
    
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalprice,
      displayPrice: `$${this.state.totalPrice.toFixed(2)}`,
      customer: {
        name: 'Phil R',
        address: {
          street: '123 Fake Street',
          city: 'Boston',
          state: 'MA',
          zip: '02116',
          country: 'US'
        },
        email: 'david.ortiz@example.com'
      },
      deliveryMethod: 'fastest'
    };
    
    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        
        let ingredients = {};
        let totalPrice = PRICE;
        for (let key in this.state.ingredientInfo) {
          ingredients[key] = this.state.ingredientInfo[key]['qty'];
          totalPrice += (ingredients[key] * this.state.ingredientInfo[key]['price']);
        }
        
        this.setState({
          loading: false,
          showPurchaseModal: false,
          ingredients: ingredients,
          totalPrice: totalPrice,
          canOrder: totalPrice > PRICE,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          showPurchaseModal: false
        });
      });
  }
  
  purchaseCancelHandler = () => {
    this.purchaseModalHandler(false);
  }
  
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = oldCount + 1;
    const updatedPrice = this.state.totalPrice + this.state.ingredientInfo[type]['price'];
    
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updateCanOrder(updatedIngredients);
  }
  
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = oldCount - 1;
    const updatedPrice = this.state.totalPrice - this.state.ingredientInfo[type]['price'];
    
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updateCanOrder(updatedIngredients);
  }
  
  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };
    
    let orderSummary = null;
    if (this.state.loading) {
      orderSummary = <Spinner/>;
    }
    
    let burger = (!!this.state.error) ? 
      <p>Cannot load Ingredients! {this.state.error.toString()}</p> :
      <Spinner/>;
      
    if (this.state.ingredients) {
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
      
      burger = (
        <Aux>
          <Burger 
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
          />
          <BuildControls
            ingredientAdded = {this.addIngredientHandler}
            ingredientRemoved = {this.removeIngredientHandler}
            disabledInfo = {disabledInfo}
            canOrder = {this.state.canOrder}
            purchaseModalHandler = {() => this.purchaseModalHandler(true)}
            totalPrice={this.state.totalPrice}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
          continueHandler={this.purchaseContinueHandler}
          cancelHandler={this.purchaseCancelHandler}
        />
      );
    }
    
    return (
      <Aux>
        <Modal 
          show={this.state.showPurchaseModal}
          hideModalHandler={() => this.purchaseModalHandler(false)}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);