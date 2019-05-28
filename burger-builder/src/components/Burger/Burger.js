import React from 'react';
import classes from './Burger.css';
import PropTypes from 'prop-types';

import Ingredient from './Ingredient/Ingredient';


const burger = (props) => {
  let ingredientList = Object.keys(props.ingredients)
    .map(ingKey => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        return <Ingredient key={ingKey + i} type={ingKey} />
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  
  console.log(`Price $${props.totalPrice.toFixed(2)}`, ingredientList);
  
  if (ingredientList.length === 0) {
    ingredientList = <p>Please start adding ingredients!</p>
  }
  
  return (
    <div className={classes.Burger}>
      <Ingredient type="bread-top" />
      {ingredientList}
      <Ingredient type="bread-bottom" />
    </div>
  );
}

burger.propTypes = {
  ingredients: PropTypes.object.isRequired,
  totalPrice: PropTypes.number
};

export default burger;