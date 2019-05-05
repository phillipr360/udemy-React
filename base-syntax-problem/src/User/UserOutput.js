import React from 'react';
import './User.css';

const userOutput = (props) => {
  return (
    <div className="UserOutput">
      <p>Hello {props.username}!</p>
      <p>You are {props.username.length} characters long.</p>
    </div>
  );
};

export default userOutput;
