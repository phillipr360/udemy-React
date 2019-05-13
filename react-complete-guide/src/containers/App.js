import React, { PureComponent } from 'react';
import webpack from './App.css';
import Aux from '../hoc/Aux';
import wrappedClass from '../hoc/wrappedClass';
//import WithClass from '../hoc/WithClass';
import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

class App extends PureComponent {
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
	
	//shouldComponentUpdate(newProps, newState) {
	//  //PureComponents implement should shouldComponentUpdate() automatically, only update if props change
	//
	//	const shouldUpdate = newState.showPersons !== this.state.showPersons || newState.persons !== this.state.persons;
	//	console.log(`Update: [App.js] inside shouldUpdate returns ${shouldUpdate}`, newProps, newState);
	//	return shouldUpdate;
	//}
	
	componentWillUpdate(newProps, newState) {
		console.log('Update: [App.js] inside componentWillUpdate', newProps, newState);
	}
	
	componentDidUpdate() {
		console.log('Update: [App.js] inside componentDidUpdate');
	}
	
  state = {
    persons: [
      {id: 1, name: 'Phil', age: 39, status: 'Ninja'},
      {id: 2, name: 'Bill', age: 43, status: 'Iced'},
      {id: 404, name: 'Markus', age: 46, status: 'TG'}
    ],
    showPersons: false,
    counter: 0
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
  	if (this.state.persons.length === 1) {
  		return;
  	}
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({persons: persons});
  }

  togglePersonHandler = (event) => {
    const isShowing = this.state.showPersons;
    this.setState((prevState, props) => {
    	return {
        showPersons: !isShowing,
        counter: (prevState.counter + 1)
    	}
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
      <Aux>
        <button onClick={() => (this.setState({showPersons: true}))}>Always Show Persons</button>
        <Cockpit
          appTitle={this.props.title}
          show={this.state.showPersons}
          len={this.state.persons.length}
          clicked={this.togglePersonHandler}
        />
        {persons}
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Raw React'));
  }
}

export default wrappedClass(App, webpack.App);