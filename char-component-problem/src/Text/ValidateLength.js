import React from 'react';
import './TextStyles.css';

const validateLength = (props) => {
  const isLongEnough = props.length < props.minLength ? `Min Length: ${props.minLength}. Too Short.` : `Long Enough.`;
  return (
    <div className="ValidateLength">
      <p>Length: {props.length}. {isLongEnough}</p>
    </div>
  );
};

export default validateLength;
