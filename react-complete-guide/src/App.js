import React, { Component } from 'react';
//import Radium, {StyleRoot} from 'radium';
import webpack from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
      {id: 1, name: 'Phil', age: 39, status: 'Ninja'},
      {id: 2, name: 'Bill', age: 43, status: 'Iced'},
      {id: 404, name: 'Markus', age: 46, status: 'TG'}
    ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const index = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // const person = this.state.persons[index]; // BAD. MUTATES STATE.
    // const person = Object.assign({}, this.state.persons[index]);
    const person = {
      ...this.state.persons[index]
    };

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[index] = person;

    this.setState({
      persons: persons
    }) 
  }

  deletePersonHandler = (index) => {
    // const persons = this.state.persons; DO NOT DO THIS! MUTATES STATE REFERENCE!
    // const persons = this.state.persons.slice(); //ES 5 immutable list
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({persons: persons});
  }

  togglePersonHandler = (event) => {
    const isShowing = this.state.showPersons;
    this.setState({
      showPersons: !isShowing
    });
  }

  render() {
    /*const myStyle = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };*/

    let persons = null;
    let btnClass = null;
    if (this.state.showPersons) {
      persons = (
        <ErrorBoundary>
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              key={person.id}
              name={person.name}
              age={person.age}
              clickHandler={() => this.deletePersonHandler(index)}
              changed={(event) => this.nameChangedHandler(event, person.id)}
            >
              Status: {person.status}
            </Person>
          })}
        </div>
        </ErrorBoundary>
      );
      btnClass = webpack.Red;
      //myStyle.backgroundColor = 'red';
      //myStyle[':hover'] = {
      //  backgroundColor: 'salmon',
      //  color: 'black'
      //};
    }

    const classes=[];
    if (this.state.persons.length <= 2) {
      classes.push(webpack.red); // classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push(webpack.bold); // classes = ['red', 'bold']
    }

    return (
      <div className={webpack.App}>
        <h1>Learning React</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button
          className={btnClass}
          /*style={myStyle}*/
          onClick={this.togglePersonHandler}
        >
          {this.state.showPersons ? "Hide" : "Show"} Persons
        </button>
        {persons}
      </div>
    );
    // return (<StyleRoot> <div className="App"> ... </div> </StyleRoot>) // Radium styles
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Raw React'));
  }
}

//export default Radium(App);
export default App;