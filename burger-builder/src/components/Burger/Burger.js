import React from 'react';
import Ingredient from './Ingredient/Ingredient';
import classes from './Burger.css';

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
  
  if (ingredientList.length === 0) {
    ingredientList = <p>Please start adding ingredients!</p>
  }
  
  console.log(ingredientList);
  
  return (
    <div className={classes.Burger}>
      <Ingredient type="bread-top" />
      {ingredientList}
      <Ingredient type="bread-bottom" />
    </div>
  );
}

export default burger;