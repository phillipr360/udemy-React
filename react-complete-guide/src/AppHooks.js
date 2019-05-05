import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const appHooks = props => {
  const [personState, setPersonState] = useState({
    persons: [
      {name: 'Phil', age: 39, status: 'Ninja'},
      {name: 'Bill', age: 43, status: 'Iced'}
    ]
  });

  const [tgState, setTgState] = useState("Markus");

  const nameHandler = () => {
    setPersonState({
      persons: [
        {name: 'El Felipe', age: 39, status: 'Ninja'},
        {name: 'Jason', age: 28, status: 'Iced'}
      ]
    })
  }

  console.log(personState, tgState);

  return (
    <div className="App">
      <h1>Learning React</h1>
      <button onClick={nameHandler}>Switch Name</button>
      <p>TG: {tgState}</p>
      <Person name={personState.persons[0].name} age={personState.persons[0].age}>Status: {personState.persons[0].status}</Person>
      <Person name={personState.persons[1].name} age={personState.persons[1].age}>Status: {personState.persons[1].status}</Person>
    </div>
  );
}

export default appHooks;