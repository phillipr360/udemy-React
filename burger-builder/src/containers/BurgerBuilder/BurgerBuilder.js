import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.6
}

class BurgerBuilder extends Component {
  //construtor(props) {
  //  super(props);
  //  this.state = {...}
  //}
  
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    canOrder: false,
    showPurchaseModal: false
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
    alert(`You paid $${this.state.totalPrice.toFixed(2)}!`);
    window.location.reload(true);
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
    const updatedPrice = this.state.totalPrice + PRICES[type];
    
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
    const updatedPrice = this.state.totalPrice - PRICES[type];
    
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
    
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal 
          show={this.state.showPurchaseModal}
          hideModalHandler={() => this.purchaseModalHandler(false)}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            continueHandler={this.purchaseContinueHandler}
            cancelHandler={this.purchaseCancelHandler}
          />
        </Modal>
        <Burger 
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
        />
        <BuildControls
          ingredientAdded = {this.addIngredientHandler}
          ingredientRemoved = {this.removeIngredientHandler}
          disabled = {disabledInfo}
          canOrder = {this.state.canOrder}
          purchaseModalHandler = {() => this.purchaseModalHandler(true)}
          totalPrice={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;