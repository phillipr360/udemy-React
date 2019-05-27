import React from 'react';
import classes from './Button.css';

const button = (props) => {
  let btnClasses = [classes.Button];
  if (!!props.btnType && !!classes[props.btnType]) {
    btnClasses.push(classes[props.btnType]);
  }
  
  return(
    <button
      className={btnClasses.join(' ')}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default button;