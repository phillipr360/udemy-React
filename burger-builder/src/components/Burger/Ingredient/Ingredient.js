import React from 'react';
import PropTypes from 'prop-types';
import classes from './Ingredient.css';

const ingredient = (props) => {
  let ingredientType = null;
  
  switch (props.type) {
    case('bread-top'):
      ingredientType = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case('salad'):
      ingredientType = <div className={classes.Salad}></div>
      break;
    case('bacon'):
      ingredientType = <div className={classes.Bacon}></div>
      break;
    case('cheese'):
      ingredientType = <div className={classes.Cheese}></div>
      break;
    case('meat'):
      ingredientType = <div className={classes.Meat}></div>
      break;
    case('bread-bottom'):
      ingredientType = <div className={classes.BreadBottom}></div>
      break;
    default:
      ingredientType = null;
      break;
  }
  
  return ingredientType;
};

ingredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default ingredient;