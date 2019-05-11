import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
	constructor(props) {
		super(props);
		console.log('[Persons.js] list inside constructor', props);
	}
	
	componentWillMount() {
		console.log('[Persons.js] list inside componentWillMount');
	}
	
	componentDidMount() {
		console.log('[Persons.js] list inside componentDidMount');
	}
	
	componentWillReceiveProps(newProps) {
		console.log('Update: [Persons.js] list will receive props inside componentWillReceiveProps', newProps);
	}
	
	shouldComponentUpdate(newProps, newState) {
		// technically, will always be a new immutable array of persons
		// should compare references to each person object in array instead
		const shouldUpdate = (newProps.persons !== this.props.persons);
		console.log(`Update: [Persons.js] list inside shouldUpdate returns ${shouldUpdate}`, newProps, newState);
		return shouldUpdate;
	}
	
	componentWillUpdate(newProps, newState) {
		console.log('Update: [Persons.js] list inside componentWillUpdate', newProps, newState);
	}
	
	componentDidUpdate() {
		console.log('Update: [Persons.js] list inside componentDidUpdate');
	}
	
	componentWillUnmount() {
		console.log('Destroying [Persons.js] list inside componentWillUnmount');
	}
	
	render() {
		console.log('[Persons.js] inside render');

		return this.props.persons.map((person, index) => {
			return <Person
				key={person.id}
				name={person.name}
				age={person.age}
				clickHandler={() => this.props.clicked(index)}
				changed={(event) => this.props.changed(event, person.id)}
			>
				Status: {person.status}
			</Person>
		});
	}
}
export default Persons;