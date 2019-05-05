import React from 'react';
import './User.css';

const userInput = (props) => {
  return (
    <div className="UserInput">
      <input type="text" value={props.username} style={props.style} onChange={props.changeUsernameHandler}/>
    </div>
  );
};

export default userInput;
