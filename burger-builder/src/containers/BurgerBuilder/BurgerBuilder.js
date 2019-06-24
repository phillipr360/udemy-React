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
    const ingredients = {
      ...this.state.ingredients
    };
    const queryParams = [];
    for (let i in ingredients) {
      queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(ingredients[i])}`);
    }
    queryParams.push(`price=${encodeURIComponent(this.state.totalPrice)}`);

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryParams.join("&")
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
    let burger = (!!this.state.error) ? 
      <p>Cannot load Ingredients! {this.state.error.toString()}</p> :
      <Spinner/>;
      
    if (this.state.ingredients) {
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
      
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
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