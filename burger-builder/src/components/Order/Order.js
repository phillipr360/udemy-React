import React from 'react';
import classes from './Order.css';
import PropTypes from 'prop-types';

const order = (props) => {
  const ingredients = [];
  for (let key in props.ingredients) {
    if (props.ingredients[key] > 0) {
      ingredients.push({
        name: key,
        amount: props.ingredients[key]
      });
    }
  }
  
  const ingredientList = ingredients.map(ig => {
    return (
      <span 
        key={ig.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}
      >{ig.name} ({ig.amount})</span>
    );
  });
  
  
  
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientList}</p>
      <p>Price: <strong>${parseFloat(props.price).toFixed(2)}</strong></p>
      {props.deliveryInfo && (
        <p>Ordered by: {props.deliveryInfo.name} in {props.deliveryInfo.city}, {props.deliveryInfo.state}</p>
      )}
    </div>
  );
}

order.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired
};

export default order;