import React from 'react';
import webpack from './Person.css';

const person = (props) => {
  return (
    <div className={webpack.Person} >
      <p onClick={props.clickHandler}>I'm {props.name} and I'm {props.age} years old.</p>
      <p>{props.children}</p>
      <input type="text" value={props.name} onChange={props.changed}/>
    </div>
  );
};

export default person;
