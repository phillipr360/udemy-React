import React from 'react';
import classes from './Input.css';
import PropTypes from 'prop-types';

const input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case ('input'):
      inputElement = <input 
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
      />;
      break;
    case ('textarea'):
      inputElement = <textarea 
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
      />;
      break;
    case ('select'):
      inputElement = (
       <select 
         className={classes.InputElement}
         value={props.value}
       >
         {props.elementConfig.options.map(option =>
           <option key={option.value} value={option.value}>
             {option.displayValue}
           </option>
         )}
       </select>
      );
      break;
    default:
      inputElement = <input 
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
      />;
      break;
  }
  
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

input.propTypes = {
  elementType: PropTypes.string.isRequired,
  elementConfig: PropTypes.object.isRequired,
  label: PropTypes.string,
  value: PropTypes.string
};

export default input;