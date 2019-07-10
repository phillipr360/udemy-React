import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
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
    totalPrice: 0,
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
        
        this.props.initializeIngredients(ingredients);
        this.setState({
          ingredientInfo: ingredientInfo,
          totalPrice: initialPrice
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({error: error});
      });
  }
  
  purchaseModalHandler = (showModal) => {
    this.setState({showPurchaseModal: showModal});
  }
  
  purchaseContinueHandler = () => {
    // alert(`You paid $${this.state.totalPrice.toFixed(2)}!`);
    const ingredients = {
      ...this.props.ingredients
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
    this.props.addIngredient(type);
    
    const updatedPrice = this.state.totalPrice + this.state.ingredientInfo[type]['price'];
    
    this.setState({
      totalPrice: updatedPrice
    });
  }
  
  removeIngredientHandler = (type) => {
    this.props.removeIngredient(type);

    const updatedPrice = Math.max(PRICE, this.state.totalPrice - this.state.ingredientInfo[type]['price']);
    
    this.setState({
      totalPrice: updatedPrice
    });
  }
  
  render () {
    const disabledInfo = {
      ...this.props.ingredients
    };
    
    let orderSummary = null;
    let burger = (!!this.state.error) ? 
      <p>Cannot load Ingredients! {this.state.error.toString()}</p> :
      <Spinner/>;
      
    if (this.props.ingredients) {
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
      
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded = {this.addIngredientHandler}
            ingredientRemoved = {this.removeIngredientHandler}
            disabledInfo = {disabledInfo}
            canOrder = {this.props.totalIngredients > 0}
            purchaseModalHandler = {() => this.purchaseModalHandler(true)}
            totalPrice={this.state.totalPrice}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalIngredients: state.totalIngredients,
    totalPrice: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
  return {
    initializeIngredients: (ingredients, totalPrice) => dispatch({
      type: actionTypes.INITIALIZE_INGREDIENTS,
      ingredients: ingredients
    }),
    addIngredient: (ingredientName) => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingredientName
    }),
    removeIngredient: (ingredientName) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingredientName
    }),
  };
}

export default withErrorHandler(
  connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), axios
);