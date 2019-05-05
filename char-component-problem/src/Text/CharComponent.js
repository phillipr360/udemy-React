import React from 'react';
import './TextStyles.css';

const validateLength = (props) => {
  return (
    <div className="CharComponent" onClick={props.clickHandler}>
      <p>{props.letter}</p>
    </div>
  );
};

export default validateLength;
