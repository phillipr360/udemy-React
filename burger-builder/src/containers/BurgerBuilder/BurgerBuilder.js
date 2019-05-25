import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    totalPrice: 4
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
        <Burger 
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
        />
        <BuildControls
          totalPrice={this.state.totalPrice}
          ingredientAdded = {this.addIngredientHandler}
          ingredientRemoved = {this.removeIngredientHandler}
          disabled = {disabledInfo}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;