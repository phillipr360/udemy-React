import React from 'react';

import './CounterOutput.css';

const counterOutput = (props) => (
  <div className="CounterOutput">
    <div>Current Counter: {props.value}</div>
    <div>Total Clicked: {props.total}</div>
  </div>
);

export default counterOutput;