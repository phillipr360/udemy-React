import React from 'react';

const withClass = (props) => (
  <div className={props.webpack}>
    {props.children}
  </div>
);

export default withClass;