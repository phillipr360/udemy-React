import React, { Component } from 'react';
import webpack from './Person.css';

class Person extends Component {
	constructor(props) {
		super(props);
		console.log(`[Person.js] object ${props.name} inside constructor`, props);
	}
	
	componentWillMount() {
		console.log(`[Person.js] object ${this.props.name} inside componentWillMount`);
	}
	
	componentDidMount() {
		console.log(`[Person.js] object ${this.props.name} inside componentDidMount`);
	}
	
	componentWillReceiveProps(newProps) {
		console.log(`Update: [Person.js] object ${newProps.name} will receive props inside componentWillReceiveProps`, newProps);
	}
	
	shouldComponentUpdate(newProps, newState) {
		const shouldUpdate = (newProps.name !== this.props.name);
		console.log(`Update: [Person.js] object ${newProps.name} inside shouldUpdate returns ${shouldUpdate}`, newProps, newState);
		return shouldUpdate;
	}
	
	componentWillUpdate(newProps, newState) {
		console.log(`Update: [Person.js] object ${newProps.name} inside componentWillUpdate`, newProps, newState);
	}
	
	componentDidUpdate() {
		console.log(`Update: [Person.js] object ${this.props.name} inside componentDidUpdate`);
	}
	
	componentWillUnmount() {
		console.log(`Destroying [Person.js] object ${this.props.name} inside componentWillUnmount`);
	}
	
	render() {
		console.log(`[Person.js] object ${this.props.name} inside render`);
		
  	return (
  		<div className={webpack.Person} >
  			<p onClick={this.props.clickHandler}>I'm {this.props.name} and I'm {this.props.age} years old.</p>
  			<p>{this.props.children}</p>
  			<input type="text" value={this.props.name} onChange={this.props.changed}/>
  		</div>
  	);
  }
}

export default Person;
