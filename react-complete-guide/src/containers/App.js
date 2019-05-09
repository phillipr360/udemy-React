import React, { Component } from 'react';
import webpack from './App.css';
import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

class App extends Component {
	constructor(props) {
		super(props);
		console.log('[App.js] inside constructor', props);
		
		// Legacy React: Initialize state in constructor
		
	  //this.state = {
	  //  persons: [
	  //    {id: 1, name: 'Phil', age: 39, status: 'Ninja'},
	  //    {id: 2, name: 'Bill', age: 43, status: 'Iced'},
	  //    {id: 404, name: 'Markus', age: 46, status: 'TG'}
	  //  ],
		//  title: props.title,
	  //  showPersons: false
	  //}
	}
	
	componentWillMount() {
		console.log('[App.js] inside componentWillMount');
	}
	
	componentDidMount() {
		console.log('[App.js] inside componentDidMount');
	}
	
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
  	console.log('[App.js] inside render');
  	
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <ErrorBoundary>
        <div>
          <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
          />
        </div>
        </ErrorBoundary>
      );
    }

    return (
      <div className={webpack.App}>
        <Cockpit
          appTitle={this.props.title}
          show={this.state.showPersons}
          len={this.state.persons.length}
          clicked={this.togglePersonHandler}
        />
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Raw React'));
  }
}

export default App;