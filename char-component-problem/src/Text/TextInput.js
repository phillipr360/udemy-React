import React from 'react';
import './TextStyles.css';

const textInput = (props) => {
  return (
    <div className="TextInput">
      <input type="text" value={props.value} style={props.style} onChange={props.changeInputHandler}/>
    </div>
  );
};

export default textInput;
