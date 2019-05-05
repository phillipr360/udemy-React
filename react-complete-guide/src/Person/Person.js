import React from 'react';
//import Radium from 'radium';
import webpack from './Person.css';

const person = (props) => {
  /*const style = {
    '@media (min-width: 500px)': {
      width: '450px'
    },
    '@media (min-width: 1000px)': {
      width: '400px'
    }
  }*/
  return (
    <div className={webpack.Person} /*style={style}*/ >
      <p onClick={props.clickHandler}>I'm {props.name} and I'm {props.age} years old.</p>
      <p>{props.children}</p>
      <input type="text" value={props.name} onChange={props.changed}/>
    </div>
  );
};

//export default Radium(person);
export default person;
