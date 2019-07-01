import React from 'react';
import classes from './Button.css';
import PropTypes from 'prop-types';

const button = (props) => {
  let btnClasses = [classes.Button];
  if (!!props.btnType && !!classes[props.btnType]) {
    btnClasses.push(classes[props.btnType]);
  }
  
  return(
    <button
      className={btnClasses.join(' ')}
      disabled={props.disabled}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

button.propTypes = {
  btnType: PropTypes.string,
  disabled: PropTypes.bool,
  clicked: PropTypes.func
};

export default button;