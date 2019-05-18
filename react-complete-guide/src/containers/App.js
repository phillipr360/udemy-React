import React, { PureComponent } from 'react';
import webpack from './App.css';
import Aux from '../hoc/Aux';
import wrappedClass from '../hoc/wrappedClass';
//import WithClass from '../hoc/WithClass';
import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
	constructor(props) {
		super(props);
		console.log('[App.js] inside constructor', props);
		
		// Legacy React: Initialize state in constructor
		
	  this.state = {
	    persons: [
	      {id: 1, name: 'Phil', age: 39, status: 'Ninja'},
	      {id: 2, name: 'Bill', age: 43, status: 'Iced'},
	      {id: 404, name: 'Markus', age: 46, status: 'TG'}
	    ],
		  title: props.title,
	    showPersons: false
	  }
	}
	
	componentWillMount() {
		// Discouraged, often used incorrectly
		console.log('[App.js] inside componentWillMount');
	}
	
	componentDidMount() {
		console.log('[App.js] inside componentDidMount');
	}
	
	componentWillReceiveProps(newProps) {
	  // Discouraged, often used incorrectly
		console.log('Update: [App.js] will receive props inside componentWillReceiveProps', newProps);
	}
	
	//shouldComponentUpdate(newProps, newState) {
	//  //PureComponents implement should shouldComponentUpdate() automatically, only update if props change
	//
	//	const shouldUpdate = newState.showPersons !== this.state.showPersons || newState.persons !== this.state.persons;
	//	console.log(`Update: [App.js] inside shouldUpdate returns ${shouldUpdate}`, newProps, newState);
	//	return shouldUpdate;
	//}
	
	componentWillUpdate(newProps, newState) {
	  // Discouraged, often used incorrectly
		console.log('Update: [App.js] inside componentWillUpdate', newProps, newState);
	}
	
	static getDerivedStateFromProps(newProps, prevState) {
		console.log('Update: [App.js] inside React 16.3 getDerivedStateFromProps', newProps, prevState);
		const updatedState = prevState;
		return updatedState;
	}
	
	getSnapshotBeforeUpdate() {
		console.log('Update: [App.js] inside React 16.3 getSnapshotBeforeUpdate', this.state);
		return this.state;
	}
	
	componentDidUpdate() {
		console.log('Update: [App.js] inside componentDidUpdate');
	}
	
  //state = {
  //  persons: [
  //    {id: 1, name: 'Phil', age: 39, status: 'Ninja'},
  //    {id: 2, name: 'Bill', age: 43, status: 'Iced'},
  //    {id: 404, name: 'Markus', age: 46, status: 'TG'}
  //  ],
  //  showPersons: false,
  //  counter: 0,
  //  authenticated: false
  //}

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
  
  loginHandler = () => {
  	this.setState({authenticated: true})
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
            // isAuthenticated={this.state.authenticated}
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
          login={this.loginHandler}
          clicked={this.togglePersonHandler}
        />
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Raw React'));
  }
}

export default wrappedClass(App, webpack.App);